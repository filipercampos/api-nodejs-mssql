# Diretório que contém a documentação da API.

## Headers key
```
X-API-KEY
```

## Response default is data
```
{
    data: any
}
```

## Response default for array is data: results
```
{
    data: {
        total_pages: 1,
        total_count: 1,
        results: []
    }
}
```
### Paginação exposed  in headers
```
x-total-count
x-total-page
```

## Response error
```
{
    data: {
        code: 500,
        status: "UNAUTHORIZED",
        message: "Não autorizado"
    }
}
```