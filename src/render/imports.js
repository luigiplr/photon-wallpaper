/* Electron */
import { shell, remote } from 'electron'

/* Node */
import { EventEmitter } from 'events'
import path from 'path'
import fs from 'fs'

/* General */
import { v4 as uuid } from 'node-uuid'
import minimist from 'minimist'
import async from 'async'
import localforage from 'localforage'
import _ from 'lodash'
import moment from 'moment'
import request from 'request'
import { sync as mkdirp } from 'mkdirp'
import wallpaper from 'wallpaper'
import 'reddit.js'

/* React */
import React, { Component } from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

/* Material UI */
import { RaisedButton, SelectField, MenuItem, Toggle, AutoComplete } from 'material-ui'
import { colors, getMuiTheme } from 'material-ui/styles'
import * as ColorManipulator from 'material-ui/utils/colorManipulator'
