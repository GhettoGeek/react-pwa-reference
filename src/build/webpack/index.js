/***
 * Copyright (c) 2016 - 2018 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
import path from 'path';
import webpack from 'webpack';
import inlineConfig from './inline';
import mainConfig from './main';
import swMainConfig from './swMain';
import swRegConfig from './swReg';

const configFactoryGroups = {
  main: [
    inlineConfig,
    mainConfig,
    swRegConfig
  ],
  sw: [
    swMainConfig
  ]
};

/**
 * Creates a task for webpack bundling/compiling groups of output targets.
 *
 * @param {String} group - The grouping of compilations, ['main', 'sw'].
 * @param {Object} settings - The project settings.
 * @param {String} target - ['dev', 'perf', 'prod'].
 * @returns nothing, calls done when complete.
 */
export default function webpackTaskFactory (group, settings, target) {
  return function taskWebpack (done) {
    const configFactories = configFactoryGroups[group];

    // webpack 2 needs an absolute output path.
    const absoluteOutputPath = path.join(process.cwd(), settings.dist.scripts);
    settings.webpack = settings.webpack || {};
    settings.webpack.absoluteOutputPath = absoluteOutputPath;

    webpack(configFactories.map((configFactory) => {
      return configFactory(settings, target);
    }), done);
  };
}
