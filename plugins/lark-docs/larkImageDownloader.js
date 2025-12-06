const utils = require('./larkUtils.js')
const tokenFetcher = require('./larkTokenFetcher.js')
const https = require('node:https')
const fetch = require('node-fetch')
const Bottleneck = require('bottleneck')
const process = require('node:process')
const crypto = require('node:crypto')
const OSS = require('ali-oss')
const { XMLParser } = require('fast-xml-parser')

require('dotenv/config')

class larkImageDownloader {
    constructor(docs, target_path) {
        this.docs = docs;
        this.images = new utils(this.docs, 'image');
        this.iframes = new utils(this.docs, 'iframe');
        this.target_path = target_path;   
        this.limiter = new Bottleneck({
            maxConcurrent: 1,
            minTime: 52,
        });
        this.client = new OSS({
            accessKeyId: process.env.OSS_ACCESS_KEY_ID,
            accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
            region: process.env.OSS_REGION,
            bucket: process.env.OSS_BUCKET,
            authorizationV4: true,
            endpoint: process.env.OSS_ENDPOINT,
        })
    }    

    async __uploadToOSS(buffer, key) {
        const parser = new XMLParser();
        const headers = {
            'x-oss-storage-class': 'Standard',
            'x-oss-object-acl': 'public-read',
            'Content-Disposition': "inline",
            'Content-Type': 'image/png',
            'x-oss-tagging': `hash=${crypto.createHash('md5').update(buffer).digest('hex')}`,
            'x-oss-forbid-overwrite': 'false'
        }

        try {
            const response = await this.client.getObjectTagging(key)
            const tags = parser.parse(response.res.data.toString('utf8')).Tagging.TagSet

            if (tags && tags?.Tag?.Key === 'hash' && tags?.Tag?.Value === crypto.createHash('md5').update(buffer).digest('hex')) {
                console.log(`Image ${key} already exists with the same hash, skipping upload.`);
                return
            }

            await this.client.put(key, buffer, { headers })
            console.log(`Successfully uploaded image to ${key}`);
        } catch (err) {
            if (err.code === 'NoSuchKey') {
                await this.client.put(key, buffer, { headers })
                console.log(`Successfully uploaded image to ${key}`);
            } else {
                console.error(`Failed to upload image to ${key}:`, err);
            }
        }
    }

    async __downloadImage(image_token) {
        console.log(`ImageToken: ${image_token}`)
        const fetcher = new tokenFetcher()
        await fetcher.fetchToken()
        const token = await fetcher.token() 

        const req = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        let res = await fetch(`${process.env.FEISHU_HOST}/open-apis/drive/v1/medias/${image_token}/download`, req)

        return res
    }

    async __downloadBoardPreview(board_token) {
        console.log(`BoardToken: ${board_token}`)
        const fetcher = new tokenFetcher()
        await fetcher.fetchToken()
        const token = await fetcher.token() 

        const req = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        let res = await fetch(`${process.env.FEISHU_HOST}/open-apis/board/v1/whiteboards/${board_token}/download_as_image`, req)

        return res
    }

    async __fetchCaption(key, node) {
        console.log(`CaptionReq: ${key} ${node}`)
        const req = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Figma-Token': process.env.FIGMA_API_KEY                
            },
        }

        const res = await fetch(`https://api.figma.com/v1/files/${key}/nodes?ids=${node}`, req)
        return res.json()
    }

    async __downloadIframe(key, node) {
        console.log(`ImageReq: ${key} ${node}`)
        let res = await fetch(`https://api.figma.com/v1/images/${key}?ids=${node}&format=png&scale=3`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Figma-Token': process.env.FIGMA_API_KEY                
            }
        })

        let url = (await res.json()).images[node]
        res = await fetch(url, {
            method: 'GET',
            headers: {
                'Connection': 'keep-alive',
                'X-Figma-Token': process.env.FIGMA_API_KEY                
            },
            agent: new https.Agent({ keepAlive: true, maxSockets: 10 })
        })

        return res
    }

}

module.exports = larkImageDownloader;