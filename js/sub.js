function menuToggle() {
    $("#left-side").toggleClass("mini-left");
    $("#small-side").toggle();
    $("#big-side").toggle();
    $("#site-name").toggle();
    thumResize();
};

function thumResize() {
    var windowWidth = $(".right-banner-img img").width();
    $(".right-banner-img img").height(windowWidth*0.35);
}

$("#menu-de-expand").click(function () {
    menuToggle();
});

$(document).ready(function(){
    // var windowWidth = $(window).width();
    var windowWidth = $("#main").width();
    if (windowWidth < 800) {
        $("#left-side").addClass("mini-left");
        $("#small-side").show();
        $("#big-side").hide();
        $("#site-name").hide();
    }
    thumResize();
});

$.ajax({
    url: '../xml/post.xml', // 읽어올 문서
    type: 'GET', // 방식
    dataType: 'xml', // 문서 타입
    timeout: 1000, // 시간 설정
    error: function(){ // 로딩 에러시
        alert('Error loading XML document');
    },
    success: function(xml){
        $i = 0;
        $(xml).find('post').each(function(){
            $i++;
            if($i>15) return false;

            var no = $(this).find("no").text();
            var category = $(this).find("category").text(); 
            var title = $(this).find("title").text(); 
            var author = $(this).find("author").text();
            var date = $(this).find("date").text();
            var read = $(this).find("read").text();
            var vote = $(this).find("vote").text();
    
            var view_text = "<tr><td class=\"no\">" + no + "</td><td class=\"category show-for-medium\">" + category + "</td><td class=\"title\"><a class=\"post-link\" href=\"#\" data-open=\"post-layer\">" + title + "</a></td><td class=\"author show-for-medium\">" + author + "</td><td class=\"date\">" + date + "</td><td class=\"read\">" + read + "</td><td class=\"vote show-for-large\">" + vote + "</td><tr>"; 
            $("#post-list").prepend(view_text);
            
        });

        $(".post-link").click(function () {
            $i = $(this).parent().parent().children(".no").text();
            
            $(xml).find('post').each(function(idx){
                if($i==(++idx)){
                    var category = $(this).find("category").text(); 
                    var title = $(this).find("title").text(); 
                    var author = $(this).find("author").text();
                    var date = $(this).find("date").text();
                    var read = $(this).find("read").text();
                    var vote = $(this).find("vote").text();
                    var content = $(this).find("content").text();

                    if(!content){
                        var content = "본문 내용이 없습니다.";
                    }
                                
                    var view_post = "<h3>" + title + "</h3><p class=\"text-right\"><span class=\"badge primary\">" + category + "</span><span class=\"badge secondary\">" + author + "</span><span class=\"badge secondary\">" + date + "</span><span class=\"badge secondary\">R: " + read + "</span><span class=\"badge secondary\">V: " + vote + "</span><hr><p>" + content + "</p>"; 
                    $("#post-main").html(view_post);

                    return false;
                }                
            });

        });
    }

});

