export function checkStatusOrder(status_order) {
  if (status_order === "not_paid") return "Not Paid"
  else if (status_order === "expire_payment") return "Expire"
  else if (status_order === "paid_unverified") return "Paid Unverified"
  else if (status_order === "paid_verified") return "Paid Verified"
  else if (status_order === "shipment") return "Shipment"
  else if (status_order === "completed") return "Completed"
  else return "?"
}

export function checkStatusOrderBgColor(status_order) {
  if (status_order === "not_paid") return "bg-[#FBD5D5]"
  else if (status_order === "paid_unverified") return "bg-[#FEF2E5]"
  else if (status_order === "paid_verified") return "bg-[#E1EFFE]"
  else if (status_order === "shipment") return "bg-[#F6E5FE]"
  else if (status_order === "completed") return "bg-[#DEF7EC]"
  else return "?"
}

export function checkStatusOrderTextColor(status_order) {
  if (status_order === "not_paid") return "text-[#9B1C1C]"
  else if (status_order === "paid_unverified") return "text-[#CD6200]"
  else if (status_order === "paid_verified") return "text-[#1E429F]"
  else if (status_order === "shipment") return "text-[#0039CD]"
  else if (status_order === "completed") return "text-[#03543F]"
  else return "?"
}

export function myStatusOrderText(status_order) {
  if (status_order === "not_paid") return "Anda belum menyelesaikan pembayaran, agar pesanan anda dapat di proses harap selesaikan pembayaran anda"
  else if (status_order === "paid_unverified") return "Admin sedang verifikasi pesanan anda, harap menunggu informasi selanjutnya"
  else if (status_order === "paid_verified") return "Pesanan anda sudah diverifikasi oleh admin, admin sedang mengurus proses shipment, harap menunggu nomor resi tertera."
  else if (status_order === "shipment") return "Pesanan anda telah diserahkan kepada kurir dan sedang dikirim ke alamat tujuan anda, harap menunggu pesanan anda sampai."
  else if (status_order === "completed") return "Pesanan anda telah sampai ditujuan anda, selamat menikmati monders! Klik tombol dibawah untuk menelusuri katalog terbaru kita"
  else return "?"
}

export function rupiah(number) {
  if (number !== undefined) return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
  
  else return "Rp 0"
}