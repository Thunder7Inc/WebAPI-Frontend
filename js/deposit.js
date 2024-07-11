const DepositAmount=()=>{

    const accountNumber = document.getElementById('accountNumber').value;
    const amount = document.getElementById('amount').value;
  
    fetch(`http://localhost:5023/api/Admin/RegisterMenu` , {
      method: "POST",
      headers: { 
        "Content-Type" : "application/json"
       },
      body: JSON.stringify({
       
            "accountNumber":accountNumber,
            "amount":amount,
            
      
      }),
    })
      .then(res => {if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        res.json();showToast("Successfully deposited",1000,'#ec4899')})
      .catch(error => {
    showToast('Error depositing amount!',1000,'#de0a26');
    console.error('Error fetching data:', error);
  });;
  }