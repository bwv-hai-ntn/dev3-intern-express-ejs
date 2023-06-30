$(function() {
  $('#searchForm').on('submit', function() {
    $('table').LoadingOverlay('show');
  });

  $('#clearButton').on('click', function() {
    $('#username').val('');
    $('#name').val('');

    $('input[name="role"]').each(function(el) {
      $(this).prop('checked', true);
    });
  });

  $('#exportButton').on('click', function() {
    const searchConditions = JSON.parse($('#searchConditions').val());
    $.ajax({
      type: 'get',
      url: '/user/export',
      data: searchConditions,
      success: function(res) {
        const blob = new Blob([res], {type: 'text/csv'});

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');

        a.setAttribute('href', url);

        const filename = `data${Date.now()}.csv`;

        a.setAttribute('download', filename);

        a.click();
      },
      error: function(e) {
        return;
      },
    });
  });

  $('#myAlert').on('click', function() {
    $('#myAlert').remove();
  });
});

function deleteButtonOnClick(e, id) {
  if (confirm(messages.I018(id)) == true) {
    $.ajax({
      type: 'get',
      url: `/user/delete/${id}`,
      success: function() {
        $(e)
          .parent()
          .parent()
          .remove();
      },
    });
  } else {
    return;
  }
}

function gotoPage(page) {
  let searchConditions = JSON.parse($('#searchConditions').val());
  searchConditions = {...searchConditions, page};
  const query = '?' + new URLSearchParams(searchConditions).toString();
  const link = window.location.origin + window.location.pathname + query;
  window.location.href = link;
}
