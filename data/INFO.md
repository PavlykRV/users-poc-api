### Populate data

To start the express server, run the following

```bash
mongoimport --db mongo-poc --collection users --drop --file users.json --jsonArray
```

```bash
mongoimport --db mongo-poc --collection locations --drop --file locations.json --jsonArray
```

```bash
mongoimport --db mongo-poc --collection groups --drop --file groups.json --jsonArray
```

```bash
mongoimport --db mongo-poc --collection pages --drop --file pages.json --jsonArray
```
