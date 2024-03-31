const AddressInputs = ({ addressProps, setAddressProps }) => {

 const { streetAddress, phone, city, country, postalCode } = addressProps


 return (
  <>
   <div className='mb-2'>
    <label htmlFor="phone" >Phone</label>
    <input id="phone" name="phone" type='tel' value={phone}
     onChange={e => setAddressProps("phone", e.target.value)}
     placeholder='Phone number' />
   </div>
   <div className='mb-2'>
    <label htmlFor="streetAddress" >Street Address</label>
    <input id="streetAddress" type='text' value={streetAddress}
     onChange={e => setAddressProps("streetAddress", e.target.value)}
     placeholder='Street address' />
   </div>
   <div className='mb-2 flex gap-x-3'>
    <div className='w-1/2'>
     <label htmlFor="postalCode" >Postal Code</label>
     <input id="postalCode" type='text' value={postalCode}
      onChange={e => setAddressProps("postalCode", e.target.value)}
      placeholder='Postal code' />
    </div>
    <div className='w-1/2'>
     <label htmlFor="city" >City</label>
     <input id="city" type='text' value={city}
      onChange={e => setAddressProps("city", e.target.value)}
      placeholder='City' />
    </div>
   </div>
   <div className='mb-4'>
    <label htmlFor="country" >Country</label>
    <input id="country" type='text' value={country}
     onChange={e => setAddressProps("country", e.target.value)}
     placeholder='Country' />
   </div>
  </>
 );
}

export default AddressInputs;