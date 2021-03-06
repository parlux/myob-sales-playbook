MSP.EnableSaveButtons = function() {
  var saveButtonSelector = '[data-action="save"]'
  var dataValueSelector = '[data-value]'

  $(saveButtonSelector).on('click', function() {
    $card = $(this).parents('[data-card]')

    $.ajax({
      url: url($card),
      method: 'PUT',
      data: data($card),
      contentType: 'application/json; charset=utf-8',
      success: function(data) {
        console.log(data)
      }
    })
  })

  // Private
  var url = function($card) {
    var resourceName = $card.data('resource').replace(/-/g, '_')
    var resourceId = $card.data('resource-id')
    return '/' + [resourceName, resourceId].join('/')
  }

  var getResourceName = function($card) {
    return $card.data('resource').replace(/-/g, '_')
  }

  var data = function($card) {
    var attr = $card.data('attr')
    var val = $card.find(dataValueSelector).val()
    var resourceName1 = getResourceName($card)
    var rawData = {}
    rawData[resourceName1] = {}
    rawData[resourceName1][attr] = val
    return JSON.stringify(rawData)
  }
}
