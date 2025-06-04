const form = document.getElementById('payment-form');
const dynamicFields = document.getElementById('dynamic-fields');
const confirmation = document.getElementById('confirmation');
const message = document.getElementById('message');

function renderFields(method) {
  let html = '';

  if (method === 'PayPal') {
    html = `
      <label>Correo electrónico de PayPal</label>
      <input type="email" name="paypalEmail" placeholder="correo@ejemplo.com" required />
    `;
  } else if (method === 'Transferencia') {
    html = `
      <label>Selecciona tipo de transferencia</label>
      <select id="transfer-type" name="transferType" required>
        <option value="Bancaria">Transferencia bancaria</option>
        <option value="Nequi">Nequi</option>
        <option value="Daviplata">Daviplata</option>
      </select>

      <label>Nombre del titular</label>
      <input type="text" name="accountHolder" placeholder="Nombre completo" required />

      <label>Número de cuenta / celular</label>
      <input type="text" name="accountNumber" placeholder="Ej: 3001234567 o 000123456789" required />
    `;
  }

  dynamicFields.innerHTML = html;
}

renderFields('PayPal');

document.querySelectorAll('input[name="payment"]').forEach(input => {
  input.addEventListener('change', (e) => {
    renderFields(e.target.value);
  });
});

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const selected = document.querySelector('input[name="payment"]:checked').value;
  message.textContent = `Transacción exitosa con ${selected}`;
  confirmation.classList.remove('hidden');
});
document.getElementById('payment-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe normalmente

  // Redirige a otra página (ajusta esta URL)
  window.location.href = '../../samuel/Slider Client Connect Services/slider.html'; // <- Cambia por la ruta a tu página destino
});