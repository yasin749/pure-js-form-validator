function pureJsFormValidator (element, settings, masks) {
  // -------HELPERS-------
  var select = function (selector) {
    return document.querySelectorAll(selector)
  }
  var extend = function (obj, src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) obj[key] = src[key]
    }
    return obj
  }
  var log = function (log, color) {
    if (options.log === true) {
      console.log('%c ' + log, 'color:' + color)
    }
  }

  // -------MAIN CODES-------

  // Options
  var defaultOptions = {
    log: false,
    rqInputClass: 'required',
    rqTextClass: 'rqMessage',
    requiredText: 'Empty can not pass',
    invalidText: 'Invalid format'
  }
  var options = extend(defaultOptions, settings)

  // Masks
  var defaultMasks = {
    mail: new RegExp('^\\s*[\\w\\-\\+_]+(\\.[\\w\\-\\+_]+)*\\@[\\w\\-\\+_]+\\.[\\w\\-\\+_]+(\\.[\\w\\-\\+_]+)*\\s*$'),
    tel: new RegExp('[0-9 -()+]+$'),
    date: new RegExp('^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$'),
    number: new RegExp('[0-9 -()+]+$'),
    url: new RegExp('https?:\\/\\/(?:www\\.|(?!www))[^\\s\\.]+\\.[^\\s]{2,}|www\\.[^\\s]+\\.[^\\s]{2,}'),
    noUrl: new RegExp('^[a-zA-Z,.,_,[0-9]{3,}$'),
    name: new RegExp('^[a-zA-ZığüşöçİĞÜŞÖÇ ]+$'),
    userName: new RegExp('^[a-zA-Z,.,_,[0-9]{3,}$')
  }
  masks = extend(defaultMasks, masks)

  // Variables
  // ...

  var init = function () {
    log('Init Start', 'red')
    initializeSelectors()
    start()
    initializeListeners()
    log('Init End', 'red')
  }

  var initializeSelectors = function () {
    log('initializeSelectors', 'yellow')
  }

  var start = function () {
    log('start', 'yellow')
  }

  var initializeListeners = function () {
    log('initializeListeners', 'yellow')

    element.addEventListener('submit', function (event) {
      log('Submit Form', 'yellow')
      // event.preventDefault();
      // formControl();
      if (formControl() === false) {
        event.preventDefault()
      }
    })
  }

  var isEmpty = function (val) {
    return !!((val === undefined || val === null || val.length <= 0))
  }

  var isTrim = function (val) {
    if (val === undefined || val === null || val.length <= 0) {
      return ''
    } else {
      return val.trim()
    }
  }

  var inputMessageWriter = function (elem, messageType) {
    var messageText = ''
    if (messageType === 'notNullMessage') {
      messageText = elem.getAttribute('requiredText') !== null ? elem.getAttribute('requiredText') : options.requiredText
    } else if (messageType === 'InvalidMessage') {
      messageText = elem.getAttribute('requiredTextInvalid') !== null ? elem.getAttribute('requiredTextInvalid') : options.invalidText
    } else {
      return false
    }

    if (isEmpty(messageText) !== true) {
      if (elem.parentElement.querySelector('.' + options.rqTextClass) === null) {
        var messageElement = document.createElement('span')
        messageElement.setAttribute('class', options.rqTextClass)
        messageElement.innerText = messageText

        elem.parentElement.insertBefore(messageElement, elem.nextSibling)
      } else {
        elem.parentElement.querySelector('.' + options.rqTextClass).innerText = messageText
      }
    }
    elem.classList.add(options.rqInputClass)
  }

  var inputRemoveMessage = function (elem) {
    try {
      var rqMessageElem = elem.parentElement.querySelector('.' + options.rqTextClass)
      rqMessageElem.parentElement.removeChild(rqMessageElem)
    } catch (e) {
    }

    elem.classList.remove(options.rqInputClass)
  }

  var inputFocus = function () {
    try {
      document.querySelector('.' + options.rqTextClass).parentElement.querySelector('input, select, textarea').focus()
    } catch (e) {
    }
  }

  var nullControl = function (elem, tagName) {
    log('nullControl', 'orange')
    if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
      if (isTrim(elem.value) === '') {
        inputMessageWriter(elem, 'notNullMessage')
        return false
      } else {
        inputRemoveMessage(elem)
      }
    } else if (tagName === 'checkbox') {
      if (select('input[type="checkbox"]:checked', elem).length === 0) {
        inputMessageWriter(elem, 'notNullMessage')
        return false
      } else {
        inputRemoveMessage(elem)
      }
    } else if (tagName === 'radio') {
      if (select('input[type="radio"]:checked', elem).length === 0) {
        inputMessageWriter(elem, 'notNullMessage')
        return false
      } else {
        inputRemoveMessage(elem)
      }
    } else {
      // invalid tag
      return false
    }
  }

  var maskControl = function (elem) {
    log('maskControl', 'pink')
    var strVal = String(isTrim(elem.value))
    var maskType = elem.getAttribute('rqType')

    var selectedMask = masks[maskType]
    if (strVal !== '') {
      if (selectedMask.test(strVal) === false) {
        inputMessageWriter(elem, 'InvalidMessage')
        return false
      } else {
        inputRemoveMessage(elem)
      }
    } else {
      inputRemoveMessage(elem)
    }
  }

  var formControl = function () {
    log('formControl', 'yellow')
    var formState = true

    select('[rq="true"], [rqType]', element).forEach(function(elem) {
      var tagName = elem.tagName.toLowerCase()
      // null control
      if (elem.getAttribute('rq') === 'true' && nullControl(elem, tagName) === false) {
        formState = false
      } else if (isEmpty(elem.getAttribute('rqType')) !== true && maskControl(elem) === false) {
        // mask control
        formState = false
      }
    })
    inputFocus()
    return formState
  }

  init()
};
