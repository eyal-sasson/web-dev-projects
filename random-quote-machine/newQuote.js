function updateQuote() {
        $.ajax({
        url: 'https://api.quotable.io/random',
        method: 'GET',
        success: (res) => {
            console.log(res.content + res.author);
            let color = 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 1)';
            console.log(color);
            $('#text').html(`<i class="fa fa-quote-left" aria-hidden="true"></i> ${res.content}`).css('color', color);
            $('#author').html(`- ${res.author}`).css('color', color);
            $('#tweet-quote').attr('href', `https://twitter.com/intent/tweet?text="${res.content}" - ${res.author}.`).css('background-color', color);
            $('#new-quote, body').css('background-color', color);
            // $('body').css('background-color', color);
        },
        error: (err) => {
            console.log('There has been an error: ' + err);
            $('#text').html("There seems to be an error")
        }
    })
}

$(function () {
    updateQuote();
    $('#new-quote').on('click', updateQuote)
});