const winston = require("winston")
const path = require("path")
const CONF = require("../config")

require("winston-daily-rotate-file")

var logger = winston.createLogger({
  transports: [
    new (winston.transports.DailyRotateFile)({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      level: 'info',
      zippedArchive: false,
      dirname: path.join(__dirname, "../logs/activity"),
      maxSize: '10g',
      maxFiles: CONF.logMaxFile
    })
  ]
})

if (CONF.elasticsearch) {
  const Elasticsearch = require('winston-elasticsearch')

  logger.add(
    new Elasticsearch({
      level: 'info',
      indexPrefix: 'mlearn-activity',
      client: require('./elasticsearch'),
      mappingTemplate: {
        "index_patterns": "mlearn-activity-*",
        "settings": {
          "number_of_shards": 1,
          "number_of_replicas": 0,
          "index": {
            "refresh_interval": "5s"
          }
        },
        "mappings": {
          "_source": { "enabled": true },
          "properties": {
            "@timestamp": { "type": "date" },
            "@version": { "type": "keyword" },
            "message": { "type": "text", "index": true },
            "severity": { "type": "keyword", "index": true },
            "fields": {
              "dynamic": true,
              "properties": {}
            },
            "fields.data.byUser.email": { "type": "string", "index": true },
            "fields.data.byUser.id": { "type": "number", "index": true }
          }
        }
      }
    })
  );
}

module.exports = logger