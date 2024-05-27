const RefGen = require('./refGen');
const RestI18N = require('./resti18n');
const fs = require('node:fs')


module.exports = function (context, options) {
    return {
        name: "fetch-apifox-docs",
        extendCli(cli) {
            cli
                .command('fetch-apifox-docs')
                .option('-s, --specifications <specifications>', 'Specifications of the API')
                .option('-l, --lang <lang>', 'Language of the API Reference', 'en-US')
                .option('-o, --output_path <target_path>', 'Target path of the API Reference', 'reference/api/restful/restful')
                .option('-i, --strings <strings>', 'Localization strings')
                .option('-g, --generate', 'Generate localization strings')
                .action((opts) => {
                    let lang = opts.lang
                    let target_path = opts.output_path
                    let specifications = opts.specifications;
                    let strings = opts.strings;

                    if (opts.generate && opts.specifications && opts.strings) {
                        const resti18n = new RestI18N(
                            specifications,
                            strings,
                        )
                        resti18n.generate_strings()
                        return
                    } else {
                        if (opts.specifications === undefined) {
                            console.log('Please provide specifications')
                            return
                        } else {
                            specifications = JSON.parse(fs.readFileSync(opts.specifications, 'utf-8'))
                        }
    
                        if (opts.lang === 'zh-CN' && opts.strings === undefined) {
                            console.log('Please provide the localization strings')
                            return
                        } 
    
                        if (opts.lang === 'zh-CN') {
                            strings = fs.readFileSync(opts.strings, 'utf-8').split('\n')
                        }
    
                        const refGen = new RefGen({
                            specifications,
                            lang,
                            target_path,
                            strings,
                        })
    
                        refGen.make_groups()
                        refGen.write_refs()
                    }
                })
            }
        }
    }