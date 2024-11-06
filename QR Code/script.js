const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  type: "png",
  data: "",
  dotsOptions: {
    color: "#000000",
    type: "dots",
  },
  cornersSquareOptions: {
    type: "square",
  },
  backgroundOptions: {
    color: "#ffffff",
  },
});

// تخزين النص المدخل محليًا
document.getElementById("text-input").value = localStorage.getItem("qrText") || '';

const qrCodeContainer = document.getElementById("qr-code");
qrCode.append(qrCodeContainer);

// تحديث QR كود مباشرة عند التغيير
function updateQRCode() {
  const text = document.getElementById("text-input").value;
  localStorage.setItem("qrText", text); // حفظ النص في التخزين المحلي
  const foregroundColor = document.getElementById("foreground-color").value;
  const backgroundColor = document.getElementById("background-color").value;
  const dotsShape = document.getElementById("dots-shape").value;
  const eyeShape = document.getElementById("eye-shape").value;
  const borderColor = document.getElementById("border-color").value;
  const borderWidth = document.getElementById("border-width").value;
  const shadowEffect = document.getElementById("shadow-effect").value;
  const fontFamily = document.getElementById("font-family").value;

  qrCode.update({
    data: text,
    dotsOptions: {
      color: foregroundColor,
      type: dotsShape,
    },
    backgroundOptions: {
      color: backgroundColor,
    },
    cornersSquareOptions: {
      type: eyeShape,
    },
  });

  // إضافة الحدود
  qrCodeContainer.style.borderColor = borderColor;
  qrCodeContainer.style.borderWidth = borderWidth + 'px';
  qrCodeContainer.style.borderStyle = 'solid';

  // إضافة تأثيرات الظل
  if (shadowEffect === 'shadow') {
    qrCodeContainer.style.boxShadow = '2px 2px 10px rgba(0,0,0,0.5)';
  } else if (shadowEffect === 'glow') {
    qrCodeContainer.style.boxShadow = '0 0 20px rgba(0,255,0,0.5)';
  } else {
    qrCodeContainer.style.boxShadow = 'none';
  }

  // تحديث المعاينة
  const previewContainer = document.getElementById("preview");
  previewContainer.innerHTML = ''; // مسح المحتوى السابق
  const previewQRCode = new QRCodeStyling({
    width: 200,
    height: 200,
    type: "png",
    data: text,
    dotsOptions: {
      color: foregroundColor,
      type: dotsShape,
    },
    backgroundOptions: {
      color: backgroundColor,
    },
    cornersSquareOptions: {
      type: eyeShape,
    },
  });
  previewQRCode.append(previewContainer);
}

// وظيفة تنزيل رمز QR بصيغة محددة
function downloadQRCode(format) {
  qrCode.download({ name: "qr-code", extension: format });
}

// وظيفة المشاركة
function shareQRCode() {
  qrCode.getRawData("png").then(blob => {
    const file = new File([blob], "qr-code.png", { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        files: [file],
        title: "QR Code",
        text: "هنا رمز QR الخاص بك!",
      });
    } else {
      alert("المشاركة غير مدعومة على هذا الجهاز.");
    }
  });
}
