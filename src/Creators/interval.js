import launchCallback from '../Helpers/callback'
import { _clearStore, initializeStore, pushToStore, isStored, getStoredItem, removeFromStore } from '../Helpers/store'

/**
 * @access private
 * @description Store for intervals.
 * @type {Map}
 */
const _store = initializeStore()

/**
 * @access private
 * @function _resetStore
 * @description Clears interval _store.
 */
const _resetStore = () => {
  _clearStore(_store)
}

/**
 * @access private
 * @function _removeInterval
 * @description Removes stored intervals with given name.
 * @param {string} name
 */
const _removeInterval = (name) => {
  removeFromStore(_store, name)
}

/**
 * @access public
 * @function createInterval
 * @description Creates and _store interval object with given name,
 * to execute callback function on the waitTime specified with given args.
 * @param {string} name
 * @param {Function} callback
 * @param {TimeUnit} waitTime
 * @param {string|Array|NULL} args
 */
const createInterval = (name, callback, waitTime, args) => {
  if (!existInterval(name)) {
    const reference = setInterval(() => {
      launchCallback(callback, args)
    }, waitTime)
    pushToStore(_store, name, reference)
  }
}

/**
 * @access public
 * @function existInterval
 * @description Checks whether exist interval with given name.
 * @param {string} name
 * @returns {boolean}
 */
const existInterval = (name) => {
  return isStored(_store, name)
}

/**
 * @access public
 * @function getInterval
 * @description Retrieves interval value for given name.
 * @param {string} name
 * @returns {number}
 */
const getInterval = (name) => {
  return getStoredItem(_store, name)
}

/**
 * @access public
 * @function destroyInterval
 * @description Destroy interval with given name and removes it from _store.
 * @param {string} name
 */
const destroyInterval = (name) => {
  if (existInterval(name)) {
    clearInterval(getInterval(name))
    _removeInterval(name)
  }
}

export {
  _store,
  _resetStore,
  _removeInterval,
  createInterval,
  existInterval,
  getInterval,
  destroyInterval,
}
