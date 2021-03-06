/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/images              ->  index
 * POST    /api/images              ->  create
 * GET     /api/images/:id          ->  show
 * PUT     /api/images/:id          ->  update
 * DELETE  /api/images/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import multer from 'multer';
import AWS from 'aws-sdk';
var Image = require('./image.model');
var config = require('../../config/environment');

var accessKeyId = config.amazon.accessKeyId;
var secretAccessKey = config.amazon.accessSecretKey;

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

var s3 = new AWS.S3();

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

export function awzUpload(req, res) {
    if(req.files.image !== undefined){ // `image` is the field name from your form
        res.redirect("/uploads"); // success
    }else{
        res.send("error, no file chosen");
    }
}
// Gets a list of Images
export function index(req, res) {
  Image.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Image from the DB
export function show(req, res) {
  Image.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// pass a single campaign as a param
exports.showParam = function(req, res, next) {
  Image.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(function () {
      next()
    })
    .catch(handleError(res));
};

// Creates a new Image in the DB
export function create(req, res) {
  Image.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Image in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Image.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Image from the DB
export function destroy(req, res) {
  Image.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
