#! /usr/bin/env node
'use strict'

import fs from 'fs'

// Use this sparingly, as file contents are fickle!
export const insertInFile = (theFile, theFind, theInsert, insertAfter = true) => {
  // read full file - Not a great idea if we ever touch large files
  let data = fs.readFileSync(theFile, 'utf-8')
  let newContents = ''
  // get the full line of first occurance
  let finder = new RegExp(`.*${theFind}.*`, '')
  let matches = data.match(finder)
  // Quick error check
  if (matches.length === 0) throw new Error(`'${theFind}' was not found in file.`)

  // insert contents into file
  if (insertAfter) {
    newContents = data.replace(finder, `${matches[0]}\n${theInsert}`)
  } else {
    newContents = data.replace(finder, `${theInsert}\n${matches[0]}`)
  }

  // overwrite file with modified contents
  fs.writeFileSync(theFile, newContents, 'utf-8')
}

export const isInFile = (theFile, theFind) => {
  // read full file - Not a great idea if we ever touch large files
  let data = fs.readFileSync(theFile, 'utf-8')
  let newContents = ''
  // get the full line of first occurance
  let finder = new RegExp(`.*${theFind}.*`, '')
  let matches = data.match(finder)
  // Quick error check
  return matches || 0
}
