import { formatTimestamp } from "./formatDate.js"; 
import { GetCompanyDetails } from "./getCOmpanyInfo.js";
import { MainTotalDiscount, SubTotal, SubTotalForWords, TotalCost, TotalDiscount } from "./getTotalCost.js";
import { numberToWords } from "./numberToWords.js";
const printableArea = document.getElementById("printableArea");



// Fetch specific invoice details
function fetchInvoice(invoiceId) {
    fetch(`/invoice/view?x=${invoiceId}`, { method: "GET" })
        .then(res => res.json())
        .then(async data => {
            if (data.success) {
                const invoiceItems = data.invoiceItems 
                const invoiceData  = data.invoiceData
                let ItemsList =  ``

const companyDetails = await GetCompanyDetails(invoiceData[0].owner_id)
const currency = "Naira"
             const Total = await TotalCost(invoiceData[0].invoice_id)
             const Discount = await MainTotalDiscount(invoiceData[0].invoice_id)
             const MainSubTotal = await SubTotal(invoiceData[0].invoice_id)
             const MainSubTotalForWords = await SubTotalForWords(invoiceData[0].invoice_id)
                for(let b =0; b<invoiceItems.length; b++){
                    ItemsList +=`    <div class="tRow">
     <div class="td first_column">${invoiceItems[0].item_description}</div>
     <div class="td second_column">${new Number(invoiceItems[0].quantity).toLocaleString()}</div>
     <div class="td third_column">&#8358; ${new Number(invoiceItems[0].rate).toLocaleString()}</div>
     <div class="td fourth_column">&#8358; ${new Number(invoiceItems[0].amount).toLocaleString()}</div>
     
 </div>`
                } 

                printableArea.innerHTML = `     
               <container class="body">
                          <header>
                              <div class="company_logo">
                                  <img src="${companyDetails.company_logo}" id="company_logo_container" alt="companyLogo">
                                 <div class="logo_right">
                                  <div id="company_name_container" class="name">${companyDetails.company_name}</div>
                                  <div id="reg_number" class="reg_number">${companyDetails.reg_number}</div>
                                 </div> 
                              </div>
                      
                              <div>
                                  <h3>INVOICE</h3>
                              </div>
                          </header>
                      
                          <main>
                      
                          <div class="sub_header">
                              <div class="company_contact">
                                  <div class="address" id="address">
                              ${companyDetails.company_address}
                                  </div>
                                  <div class="phonenumber" id="phonenumber">${companyDetails.company_phone}</div>
                                  <div class="email" id="email">${companyDetails.company_email}</div>
                                  <div class="website" id="website">${companyDetails.company_website}</div>
                              </div>
                      
                              <div class="date_container">
                                  <ul>
                                      <li>
                                          Date:  <div class="box" id="CurrentDateContainer">${formatTimestamp(invoiceData[0].date_created)}</div>
                                      </li>
                                      <li>
                                          Invoice Number: <div class="box" id="InvoiceNumberContainer">${invoiceData[0].invoice_id}</div>
                                      </li>
                                      <li>Due Date: <div class="box" id="DueDateContainer">${invoiceData[0].expiry_date}</div></li>
                                  </ul>
                              </div>
                          </div>
                      
                          <!-- Bill To  -->
                          <div class="bill_to">
                              <div class="bill_to_header">
                                  Bill To
                              </div>
                              <div class="bill_to_body">
                                  <ul id="bill_to_container">
                                      <li>${invoiceData[0].recipient_name}</li>
                                      <li>${invoiceData[0].reciepient_email}</li>
                                      <li>${invoiceData[0].company_name}
                                  </ul>
                              </div>
                          </div>
                      
                          <!-- ENd Bill To  -->
             
                      
                      
                          <div class="table">
                              <div class="thead">
                                      <div class="th first_column">Description</div>
                                      <div class="th second_column">QTY</div>
                                      <div class="th third_column">Rate</div>
                                      <div class="th fourth_column">Amount </div>
                                      <div class="th fifth_column">.</div>
                                  
                              </div>
                      <!-- Table body Start  -->
                              <div class="tbody" id="tbody">
                      
                                 ${ItemsList}
                                 </div>
                           
                          </div>
                      <!-- End Table body  -->
                      
                      
                          <div class="footer">
                              <div class="footer-left">
                                  <div class="left-header">
                                      <u>Payment Details</u>
                                  </div>
                                  <ul>
                                      <li>Account No: <span id="bank_account_container">${companyDetails.account_number}</span></li>
                                      <li>Account Name: <span id="bank_account_name_container">${companyDetails.account_name}</span></li>
                                      <li>Bank Name: <span id="bank_name_container">
                                      ${companyDetails.bank_name}
                                      </span></li>
                      
                                  </ul>
                              </div>
                      
                              <div class="footer-right">
                                  <ul>
                                      <li>Subtotal: <span id="subTotal">&#8358;  ${Total}</span></li>
                                      <li>Discount:  <span id="DiscountsContainer">&#8358; ${Discount} </span> </li>
                                      <li>Total: <span id="GrossTotalContainer">&#8358;  ${MainSubTotal}</span></li>
                                  </ul>
                              </div>
                          </div>
                      
                          <div class="amount_in_words">
                              <div class="top">
                                  <span class="amountWords">
                                      Amount In Words: 
                                  </span>
                                  <div class="line_container" id="amount_in_words_container">
                                  ${numberToWords(MainSubTotalForWords)} ${currency} Only.
                                  </div>
                              </div>
                              <div class="bottom">
                                  <div class="line_container"></div>
                              </div>
                          </div>
                      
                          <div class="signatory">
                              <div class="name_and_sign">
                                  <div class="signature">
                                      <img src="${companyDetails.signature}"
                                      id="signee_signature_container" alt="signature">
                                  </div>
                                  <div id="signee_name_container" class="name_container">${companyDetails.fullname}</div>
                              </div>
                              <div class="company_name_sign">
                                  For <span id="company_name_container_sign"></span>
                              </div>
                          </div>
                      
                      
                          <br><br>
                      <footer>
                          <center>   
                          <small>Powered by Weperch Technologies LLC</small>
                      </center>
                      </footer>
                          </main>
                      
                      
                      
                      </container>`;
            } else {
                printableArea.innerHTML = "Could Not Retrieve Invoice at the moment";
            }
        });
}
const invoiceId = document.getElementById("invoiceId")
fetchInvoice(invoiceId.value)
