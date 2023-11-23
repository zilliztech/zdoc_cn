// const Translator = require('../lark-docs/baiduTranslator')

const fs = require('node:fs')

class restI18n {
    constructor(specifications, strings) {
        // this.t = new Translator('en', 'zh')
        this.specifications = specifications
        this.strings = strings
        this.result = []
    }

    async localize(specifications, strings) {
        await this.__iterate_object(specifications["paths"], '["paths"]', strings)

        return strings.concat(this.result).join('\n')
    }

    async generate_strings() {
        var strings = fs.readFileSync(this.strings, 'utf-8').split('\n')
        var specifications = JSON.parse(fs.readFileSync(this.specifications, 'utf-8'))
        this.__iterate_object(specifications["paths"], '["paths"]', strings)

        for (const string of this.result) {
            const path = string.split("=")[0]
            strings.filter(x => x.split("=")[0] == path).length == 0 && strings.push(string)
        }

        fs.writeFileSync(this.strings, strings.join('\n'))
    }

    __iterate_object(d, path, strings) {
        for (const key of Object.keys(d)) {
            if (key.startsWith('x-')) {
                continue
            }

            if (typeof(d[key]) == 'object' && !Array.isArray(d)) {
                this.__iterate_object(d[key], `${path}["${key}"]`, strings)
            } else if (Array.isArray(d)) {
                this.__iterate_object(d[key], `${path}[${key}]`, strings)
            } else if (!this.__is_translated(`${path}["${key}"]`, strings)) {
                if (['summary', 'description'].indexOf(key) > -1) {
                    // const dst = await this.t.translate(d[key])
                    this.result.push(`${path}["${key}"]="${d[key]}"`)
                }
            }
        }
    }

    __is_translated(path, strings) {
        return strings.map(x => x.split('=')[0]).indexOf(path) > -1
    }
}

module.exports = restI18n