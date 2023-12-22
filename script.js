window.onload = function(){
    btn_priceGuides = document.getElementById('btn-priceGuides');
    input_priceGuides = document.getElementById('priceGuides');
    select_priceGuides = document.getElementById('select-priceGuides');
    //Set up priceGuides button
    btn_priceGuides.addEventListener('click',function(){input_priceGuides.click();},false);
    //Set up function for file handling
    input_priceGuides.addEventListener('change',processFiles,false);

    //Set up select price Guides
    select_priceGuides.addEventListener('change',function(event) {
     load_priceGuide( event.target.value);
      },false);

    //Check if json data is available
    priceGuides = JSON.parse(priceGuides);
    if(priceGuides['count'] == null){
        alert('No Price Guides were found!');
    }else{
      document.getElementById('add-priceGuides').style.display = 'none';

        select_priceGuides = document.getElementById('select-priceGuides');
        //alert(priceGuides['count']);
        // Use forEach to iterate over the array
        priceGuides.priceGuides.forEach(item => {
            // 'item' represents each element in the array
            // Do something with 'item'
            var option = document.createElement('option');
            option.text = `${item.department} | ${item.type}`;
            option.value = item.fileName;

            select_priceGuides.appendChild(option);
            console.log(item.fileName, item.department, item.type);
        });
        
    }
     
}
 // Global array to store all file data
 const allFileData = [];

 function processFiles() {
   const fileInput = document.getElementById('priceGuides');
   const formContainer = document.getElementById('formContainer');

   // Clear previous form
   formContainer.innerHTML = '';

   // Loop through selected files
   for (const file of fileInput.files) {
     const fileName = file.name;

     // Create form elements
     const form = document.createElement('form');
     form.innerHTML = `
       <label for="filename">Filename: ${fileName}</label>
       <input type="text" id="filename" name="filename" value="${fileName}" readonly hidden><br>
       <label for="department">Department:</label>
       <input type="text" id="department" name="department">
       <!--
       <select id="department" name="department">
         <option value="seasonal">Seasonal</option>
         <option value="plumbing">Plumbing</option>
         <option value="electrical">Electrical</option>
       </select>
       -->
       <br>
       <label for="type">Type:</label>
       <input type="text" id="type" name="type">
       <!--
       <br>
       <label for="count">Count:</label>
       <input type="number" id="count" name="count" value="1">
       -->
     `;

     // Add the form to the container
     formContainer.appendChild(form);
   }
 }
     function submitForms() {
       // Get all forms in the container
       const forms = document.querySelectorAll('#formContainer form');
 var priceGuideCount = 0;
       // Loop through forms
       forms.forEach(form => {
         // Get form data
         const formData = new FormData(form);
         const department = formData.get('department');
         const type = formData.get('type');
         const fileName = formData.get('filename');
         
         //const count = formData.get('count');
 
         // Add file information to the global array
         allFileData.push({
           fileName: fileName,  // You may want to store the filename in the form data when creating the form
           department,
           type
           //,count
         });
 
         // Remove the form after submission
         form.remove();
        // alert(allFileData['priceGuides'].length);
        priceGuideCount++;
       });


       jsonResult = JSON.stringify({ priceGuides: allFileData,count:priceGuideCount }, null, 2);
       
       jsonResult2 = 'var priceGuides = `' + JSON.stringify({ priceGuides: allFileData }, null, 2) + "`;";
       
       
       // Display the JSON result
       //document.getElementById('formContainer').innerHTML = `<pre>${jsonResult}</pre>`;
     
     // Save the JSON data to a file
  const blob = new Blob([jsonResult2], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'priceGuides.js';

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
    
    
    }

