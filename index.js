#!/usr/bin/env node

const program = require('commander');

function parseLog(logString) {
  const startIndex = logString.indexOf('http') ||  logString.indexOf('https')
  const endIndex = logString.indexOf(' -') || logString.findIndex('{}')

  const requestString = logString.slice(startIndex, endIndex)

  const urlEndIndex = requestString.indexOf(' ')
  const url = requestString.slice(0, urlEndIndex)

  const headers = requestString.slice(urlEndIndex, requestString.length - 1).split('; ')

  const userAgentIndex = headers.findIndex((elem) => elem.includes('x-user-agent='))

  headers.splice(userAgentIndex, 2)

  const parsedHeaders = headers
    .map((header) => header.split('='))
    .filter((header) => {
      const headerValue = header[1];

      return Boolean(headerValue)
    })

  return {
    url,
    headers: parsedHeaders,
  };
}

function formatToCurl(parsed) {
  const headers = parsed.headers.reduce((acc, header) => {
    const [ name, value ] = header

    return `${ acc } --header "${ name }: ${ value }"`
  }, '')


  return `curl ${ headers } '${ parsed.url }'`
}

program
  .arguments('<accessLog>')
  .action((accessLog) => {
      const parsed = parseLog(accessLog)

      const formatted  = formatToCurl(parsed)

      console.log('\n')
      console.log(formatted)
      console.log('\n')

  })
  .parse(process.argv);


// 2019-02-07 19:53:04.596 e8535a6771cf0028ef8bd5fbd64bec7f publicApiDealers[GET] 200 1584 http://dev-autoru-api-server-int.vrts-slb.test.vertis.yandex.net:80/1.0/dealer/wallet/product/activations/total-stats?service=autoru&from=2019-01-31&to=2019-02-07 x-application-id=autoru-frontend-cabinet; x-application-hostname=stormtrooper-02-sas.dev.vertis.yandex.net; x-descript2-controller=true; x-request-id=e8535a6771cf0028ef8bd5fbd64bec7f; accept=application/json; content-type=application/json; x-authorization=Vertis web-ca0fdac472c273a4cbe66134d0070095; x-autoruuid=g5bb23e6723aaldb573tmnjtehm8gpn5.38d2694eb0e7a550a82aa3958745cff3; x-device-uid=g5bb23e6723aaldb573tmnjtehm8gpn5.38d2694eb0e7a550a82aa3958745cff3; x-exp-bucket=0; x-exp-flags=; x-session-id=41358030|1549557567882.7776000.rfQcHziERtstEFokBfcPXg.Gj9oUGb6l2THtPkYEKm-WDBSYxYcxxpVujsEifLefHw; x-user-ip=2a02:6b8:0:827::1:9e; x-yandexuid=; x-suid=636a1b7f323383377a490c1c184d99d6.02801956ac5f0cb796b622b0ea72c8be; x-fingerprint=; x-device-type=DESKTOP; accept-encoding=gzip, deflate -