// Generated on 2015-12-08 using generator-angular-fullstack 3.0.2
'use strict';

module.exports = function (grunt) {
  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch(e) {
    localConfig = {};
  }

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    buildcontrol: 'grunt-build-control'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

   
    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        force: true,
        connectCommits: false,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      production: {
        options: {
          remote: 'git@heroku.com:richneighbors.git',
          branch: 'master',
          remoteBranch: 'master'
        }
      },
      staging: {
        options: {
          remote: 'git@heroku.com:richneighbors-dev.git',
          branch: 'develop',
          remoteBranch: 'master',
          connectCommits: false,
        }

      },
      openshift: {
        options: {
          remote: 'openshift',
          branch: 'master'
        }
      }
    }
  })}