(function(scs) {
    scs(window.jQuery, window, document);
    }(function($, window, document) {

        'use strict';

        function getuserRepo(ghUsername) {
            
            let URL = `https://api.github.com/users/${ghUsername}/repos`;
            fetch(URL)
                .then(response => response.json())
                .then(data => 
                    displayResults(data))
        }

        function displayResults(data) {
            
            $('#results-list').empty();
            for (let i = 0; i < data.length; i++) {
                //gives me name of repo 
                //console.log(data[i].name);

                //gives me URL of repo 
                //console.log(data[i].html_url);
                //$('#results-list').empty();

                $('#results-list').append(
                    `<li>
                    <p>Repo: ${data[i].name}</p>
                    <p>Repo URL: <a href="${data[i].html_url}">${data[i].html_url}</a></p>
                    </li>`
                )
            }

            //display the results section
            $('.results').removeClass('hidden');
        }

        function watchForm() {
            $('form').submit(event => {
                event.preventDefault();

               let usernameEntry = $('#username-entry').val();

                if(usernameEntry === '') {
                    alert('Input can not be left blank');
                    return;
                }

                getuserRepo(usernameEntry);
                $('#candidate-form').find('input:text').val(''); 

            });
        }

        $(function() {
            console.log('App loaded! Waiting for submit!');
            watchForm();
        });
        
    })
);