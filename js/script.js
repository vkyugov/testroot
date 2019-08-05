
/*array for hide and show roor*/
var closemass = [];
/*main function wich cheking clicks*/
$(window).on('click', function(event) {
    var element = event.target;
    if ($(element).hasClass('newroot')) {
/*arrow style*/
      $('.arrow').css({'width' : '5px',
                  '-webkit-transform' : 'rotate(45deg)',
                 '-moz-transform' : 'rotate(45deg)',
                 '-ms-transform' : 'rotate(45deg)',
                 'transform' : 'rotate(45deg)'});
/*confirm window for adding new root*/
       $.confirm({
        closeIcon: true,
        closeIconClass: 'fa fa-close',
        boxWidth: '300px',
        useBootstrap: false,
        type: 'blue',
        title: 'Type name of new root',
        content: '' +
                '<input type="text" placeholder="root name" id="name">',
        buttons: {
          formSubmit:{
            text:'Create',
            btnClass: 'create',
             action: function () {
              
              var rootparentname = $(element).val();
              var rootname =  $("#name").val();

                 if(rootname.replace(/^\s+|\s+$/g, '') === ''){
                  $.alert('you need to type name !');
                 die();
                  }/*sent data to add.php*/
                       $.ajax({
                    url: 'class/add.php',
                    type: "POST",
                    data:  {name : rootname,
                            parentname : rootparentname
                          },
                    /*create new root on page*/
                    success: function (response) {
                      result = $.parseJSON(response);
                      valpar = '/' +result.id+'/' + result.parent;
                      par = result.par.replace(/[.,+\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                     $(element).parent().append(" "+
                      "<ul id = '"+result.id+"'><li class = 'list' id =  '"+result.id + "'>"+ 
                      " " + "<a href = '#' class = 'namelist' id = '"+result.id+"'>" + rootname + ' ' +
                       "</a><button class='del' value = '"+result.id+
                       "'>-</button>  <button class='newroot' value = '"+valpar+
                       "'>+</button></li></ul>");
                     if($('i[id = "' + par + '"').length){}
                      else{
                     $('li[id = "' + par + '"]').prepend("<i  id = '" + par + "' class='fa fa-caret-right' aria-hidden='true'></i>");
                     $('i[id = "' + par + '"]').css({
                  '-webkit-transform' : 'rotate(45deg)',
                 '-moz-transform' : 'rotate(45deg)',
                 '-ms-transform' : 'rotate(45deg)',
                 'transform' : 'rotate(45deg)'});

                     $.alert({
                            title: 'Creating was sucsessful!',
                            type: 'green',
                            boxWidth: '600px',
                            content: '"' + rootname + '" has been craeted !! ',
                        });
                     } 
                    },
                    error: function (response) {
                           $.alert({
                            title: 'Error!',
                            type: 'red',
                            boxWidth: '600px',
                            content: '"' + rootname + '" hasn\'t been craeted !! ',
                        });
                      }
                    });
                 }},
              cancel: function () {
                return true;
              }
            }
      });
    }
    /*function for deleting root*/
    if ($(element).hasClass('del')) {
      /*confirm deleting*/
      $.confirm({
        boxWidth: '300px',
        useBootstrap: false,
        type: 'red',
        closeIcon: true,
        closeIconClass: 'fa fa-close',
        title: 'Confirm Remooving!',
        autoClose: 'cancel|20000',
        content: ''+
        'Are you sure to remove this rooot?!',
        buttons: {
          formSubmit:{
            text:'Delete',
            btnClass: 'delete',
             action: function () {
              /*sent data to del.php*/
                   var rootid = $(element).val();

                      $.ajax({
                    url: 'class/del.php',
                    type: "POST",
                    data:  {id : rootid},
                    success: function (response) {
                      result = $.parseJSON(response);
                      par = result.par.replace(/[.,+\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                      /*deleting elements of root from page*/
                      $('i[id = "' + par + '"]').remove();

                      $.alert({
                            title: 'Deleting was sucsessful!',
                            type: 'green',
                            boxWidth: '600px',
                            content: result.name + ' has been removed!! ',
                        });

                      $(element).parent().remove();
                    },
                    error: function(){
                         $.alert({
                            title: 'Error!',
                            type: 'red',
                            boxWidth: '600px',
                            content: '"' + rootname + '" hasn\'t been deleted !! ',
                        });
                      }
           });     
          }},
          cancel: function () {
            return true;
          }
        }
      });
    }
    /*function for updating*/
    if ($(element).hasClass('namelist')) {
       $.confirm({
        boxWidth: '300px',
        useBootstrap: false,
        closeIcon: true,
        type: 'yellow',
        closeIconClass: 'fa fa-close',
        title: 'Type new name of this root',
        content: '' +
                '<input type="text" placeholder="new name" id="newname">',
        buttons: {
          formSubmit:{
            text:'Update',
            btnClass: 'update',
             action: function () {
              /*sent data to update.php*/              
               var rootoldname =  $(element).text()
               var rootnewname =  $("#newname").val();
               var rootid = $(element).attr("id");

                 if(rootnewname.replace(/^\s+|\s+$/g, '') === ''){
                  $.alert('you need to type name !');
                 die();
                  }
                       $.ajax({
                    url: 'class/update.php',
                    type: "POST",
                    data:  {old : rootoldname,
                            id : rootid,
                            new : rootnewname
                          },
                    success: function (response) {
                    //valpar = '/' +result.id+'/' + result.parent;
                     $(element).html(rootnewname + ' ');
                      $.alert({
                            title: 'Updeting was sucsessful!',
                            type: 'green',
                            boxWidth: '600px',  
                            content: '"' + rootoldname + '" have been updaeted to "' + rootnewname + '"!! ',
                        });
                    },
                    error: function(){
                         $.alert({
                            title: 'Error!',
                            type: 'red',
                            boxWidth: '600px',
                            content: '"' + rootoldname + '" hasn\'t been updated !! ',
                        });
                      }
                    });
                 }},
              cancel: function () {
                return true;
              }
            }
      });
    }
    /*function for hide and show folder by arrow click*/
    if ($(element).hasClass('fa fa-caret-right')) {
      var pos = $(element).attr("id");
      var r = closemass.indexOf(pos);
      if(r == - 1){
        closemass.push(pos);
        $(element).css({
                  '-webkit-transform' : 'rotate(0deg)',
                 '-moz-transform' : 'rotate(0deg)',
                 '-ms-transform' : 'rotate(0deg)',
                 'transform' : 'rotate(0deg)'});

        $('li[id = "' + pos + '"] > ul').hide(300);
      }
      else{
        $('li[id = "' + pos + '"] > ul').show(300);
        $(element).css({
                  '-webkit-transform' : 'rotate(45deg)',
                 '-moz-transform' : 'rotate(45deg)',
                 '-ms-transform' : 'rotate(45deg)',
                 'transform' : 'rotate(45deg)'});
        closemass = $.grep(closemass, function(value) {
         return value != pos;
          });
      }
    }
});
