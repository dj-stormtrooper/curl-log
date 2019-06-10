# curl-log

## Usage
```
npx curl-log <access_log_line>
```

## Exapmle
```
npx curl-log '2019-02-07 19:53:04.596 e8535a6771cf0028ef8bd5fbd64bec7f resource[GET] 200 1584 http://host/1.0/path?from=2019-01-31&to=2019-02-07 accept=application/json; content-type=application/json; accept-encoding=gzip, deflate -'

output:

curl  --header " accept: application/json" --header "content-type: application/json" 'http://host/1.0/path?from=2019-01-31&to=2019-02-07'

```

Пока без вложенных хэдеров типа User Agent
