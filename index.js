//TO DISPLAY THE COUNTRIES NAMES AS OPTIONS IN A SELECT
fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(Countries => {
            for (i = 0; i < Countries.length; i++) {
                 
                  var select = document.getElementById('select');
                  var option = document.createElement('option');
                  option.innerHTML = Countries[i].name.common;
                  select.appendChild(option);
                  
                 

            }
      })


//-------------------------------------------------------------------------------------------------
//TO DISPLAY THE SELECTED COUNTRY'S FLAG AND CURRENCIES
function displayflag() {
      //flag display
      
      document.getElementById('flags').innerHTML = " ";  //to empty the div every time "onchange" occurs
      //var flag=document.createElement('img');
      var selected = document.getElementById('select').value; //retrieving the selected country's name (option)
      var flags = document.getElementById('flags');


      fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(Countries => {
                  for (i = 0; i < Countries.length; i++) {  //flag
                        if (Countries[i].name.common == selected) {
                              document.getElementById('currencylist').innerHTML = " ";
                              document.getElementById('container').innerHTML= " ";
                              flags.src = Countries[i].flags.png;

                              
                              if (Countries[i].currencies) { //TO DISPLAY BUTTONS OF SELECTED COUNTRY'S FLAG ==> THEN EXCHANGE RATE TO USD
                                    document.getElementById('currencylist').innerHTML = " ";
                                    Object.keys(Countries[i].currencies).forEach((x) => {
                                          //if(Object.keys(countries[i].currencies).length==1) document.getElementById('currencylist').innerHTML = " "; //to empty the list after the buttons are clicked
                                          var selected_currency = document.createElement('button');
                                         selected_currency.setAttribute("id","buttons");
                                          var item=document.createElement('li');
                                          selected_currency.innerHTML = x;
                                          item.appendChild(selected_currency);
                                         
                                          document.getElementById('currencylist').appendChild(item);
                                          document.getElementById("buttons").style.fontSize="20px";
                                          let styles= `  background-color: initial;
                                          background-image: linear-gradient(-180deg, #FF7E31, #E62C03);
                                          border-radius: 6px;
                                          box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
                                          color: black;
                                          cursor: pointer;
                                          display: inline-block;
                                          font-family: Inter,-apple-system,system-ui,Roboto,"Helvetica Neue",Arial,sans-serif;
                                          height: 40px;
                                          line-height: 40px;
                                          outline: 0;
                                          overflow: hidden;
                                          font-weight:bold;
                                          padding: 0 20px;
                                          pointer-events: auto;
                                          position: relative;
                                          text-align: center;
                                          touch-action: manipulation;
                                          user-select: none;
                                          -webkit-user-select: none;
                                          vertical-align: top;
                                          white-space: nowrap;
                                          width:20%;
                                          z-index: 9;
                                          border: 0;
                                          transition: box-shadow .2s;
                                          `
                                          document.getElementById("buttons").style=styles;

                                          selected_currency.onclick = function () { //ONCE CURRENCY BUTTON IS CLICKED===>WILL BE CONVERTED TO USD
                                                var URL = 'https://api.fastforex.io/fetch-one?from='+selected_currency.innerHTML+'&to=USD&api_key=27b08c8abf-1ade99474a-rquvgx' //EXCHANGE API
                                                fetch(URL)
                                                      .then(response => response.json())
                                                      .then(response => {
                                                            _exchangeRate = response.result.USD;
                                                           //var lastdiv= document.createElement('div');
                                                           //lastdiv.setAttribute("id","last");
                                                           let divstyle= 
                                                           `
                                                           
                                                           
                                                             background: #fff;
                                                             backface-visibility: hidden;
                                                             border-radius: .375rem;
                                                             border-style: solid;
                                                             border-width: .125rem;
                                                             box-sizing: border-box;
                                                             color: #212121;
                                                             cursor: pointer;
                                                             display: inline-block;
                                                             font-family: Circular,Helvetica,sans-serif;
                                                             font-size: 1.125rem;
                                                             font-weight: 700;
                                                             letter-spacing: -.01em;
                                                             line-height: 1.3;
                                                             padding: .875rem 1.125rem;
                                                             position: relative;
                                                             text-align: left;
                                                             text-decoration: none;
                                                             transform: translateZ(0) scale(1);
                                                             transition: transform .2s;
                                                             user-select: none;
                                                             -webkit-user-select: none;
                                                             touch-action: manipulation; 
                                                           `
                                                           
                                                           var result= document.createElement('span');
                                                           result.setAttribute("id","result");
                                                            result.innerHTML = '1 ' + selected_currency.innerHTML + '= ' + _exchangeRate + ' $';
                                                            //document.getElementById("div").appendChild(lastdiv);
                                                            document.getElementById("container").appendChild(result);
                                                           // document.getElementById("last").style=divstyle;
                                                            document.getElementById("result").style=divstyle;


                                                      } 
                                                      ); 
                                          }
                                    } );
                                    
                              }




                              

                        }

                  }
            })

}


