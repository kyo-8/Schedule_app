// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//= require jquery
//= require moment
//= require fullcalendar
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
$(function () {
    // 画面遷移を検知
    $(document).on('turbolinks:load', function () {
        // lengthを呼び出すことで、#calendarが存在していた場合はtrueの処理がされ、無い場合はnilを返す
        if ($('#calendar').length) {
            function eventCalendar() {
                return $('#calendar').fullCalendar({
                });
            };
            function clearCalendar() {
                $('#calendar').html('');
            };

            $(document).on('turbolinks:load', function () {
                eventCalendar();
            });
            $(document).on('turbolinks:before-cache', clearCalendar);

            $('#calendar').fullCalendar({
                events: '/events.json',
                //年月を表示させる（カレンダー上部）
                titleFormat: 'YYYY年 M月',
                
                //日本語表示（曜日）
                dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
                //高さ
                height: 800,
                //ボタンレイアウト
                header: {
        　      left: 'prev,prevYear,nextYear,next today',
                center: "title",
                right: 'month,agendaWeek,agendaDay,listYear'
                },
                //終了時刻がないイベントの表示間隔
                defaultTimedEventDuration: '03:00:00',
                buttonText: {
                    prev:     '<',
                    next:     '>',
                    prevYear: '<<',
                    nextYear: '>>',
                    listYear: '予定リスト',
                    today: '今日',
                    month: '月',
                    week: '週',
                    day: '日'
                },
                //イベントの時間表示を２４時間設定
                timeFormat: "HH:mm",
                //イベントの色を変える
                eventColor: '#63ceef',
                //イベントの文字色を変える
                eventTextColor: '#000000',
                droppable: true, // イベントをドラッグできるかどうか
                //イベントをクリックしたときに実行
                eventClick: function(event) {
                    var id = event.id
                    var show_url = "/events/"+id
                    location.href = show_url;
                  },
                  
                  //日付クリック
                dayClick: function(date, jsEvent, view) {
 
                alert('クリックした時間: ' + date.format() + '\n座標: ' + jsEvent.pageX + ',' + jsEvent.pageY+'\nスケジュール: ' + view.name);
                // change the day's background color just for fun
                $(this).css('background-color', 'brue');
 
            },
                //ドラッグ可能
                selectable:true,
                selectHelper:true,
                //ドラッグ後処理
                select: function(start, end) {
                    var title = prompt('イベントタイトル:');
                    var eventData;
                if (title) {
                    eventData = {
                        title: title,
                        start: start,
                        end: end
                };
            $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
        }
            $('#calendar').fullCalendar('unselect');
        },
                });
            }
        
        });
    });
