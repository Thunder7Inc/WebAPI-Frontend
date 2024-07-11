const WithdrawAmount=()=>{

    const accountNumber = document.getElementById('accountNumber').value;
    const amount = document.getElementById('amount').value;
    const pin = document.getElementById('pin').value;
  
    fetch(`https://thunderapi.azurewebsites.net/api/Transaction` , {
      method: "POST",
      headers: { 
        "Content-Type" : "application/json"
       },
      body: JSON.stringify({
       
        
          "accountId": accountNumber,
          "type": 1,
          "amount": amount,
          "pin": pin
        
            
      
      }),
    })

      .then(async(res) => {if (!res.ok) {
          const error= await res.json();  
        throw new Error(error.message);
        
        }
        res.json();showToast("Successfully withdrew amount",1000,'#ec4899')})
      .catch(error => {
    showToast(error,1000,'#de0a26');
    console.error('Error fetching data:', error);
  });;
  }