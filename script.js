const NATAFIN_STORAGE_KEY = "natafinTransactions";
const TOTAL_TABUNGAN = 500000;

const TRANSAKSI_AWAL = [
    {
        id: 1,
        date: "2026-09-26",
        type: "pengeluaran",
        category: "Makanan",
        description: "Makan siang",
        amount: 25000
    },
    {
        id: 2,
        date: "2026-09-25",
        type: "pengeluaran",
        category: "Transportasi",
        description: "Ojek online",
        amount: 18000
    },
    {
        id: 3,
        date: "2026-09-24",
        type: "pemasukan",
        category: "Uang Saku",
        description: "Uang bulanan",
        amount: 1500000
    },
    {
        id: 4,
        date: "2026-09-23",
        type: "pengeluaran",
        category: "Pendidikan",
        description: "Membeli buku",
        amount: 75000
    },
    {
        id: 5,
        date: "2026-09-22",
        type: "pengeluaran",
        category: "Belanja",
        description: "Kebutuhan bulanan",
        amount: 200000
    },
    {
        id: 6,
        date: "2026-09-21",
        type: "pengeluaran",
        category: "Tagihan",
        description: "Tagihan internet",
        amount: 120000
    },
    {
        id: 7,
        date: "2026-09-20",
        type: "pengeluaran",
        category: "Hiburan",
        description: "Langganan hiburan",
        amount: 62000
    }
];

const TARGET_TABUNGAN = [
    { name: "Laptop Baru", target: 10000000, saved: 4000000 },
    { name: "Liburan", target: 3000000, saved: 1500000 }
];

function muatTransaksi() {
    try {
        const dataTersimpan = localStorage.getItem(NATAFIN_STORAGE_KEY);

        if (dataTersimpan !== null) {
            const data = JSON.parse(dataTersimpan);

            if (Array.isArray(data)) {
                return data;
            }
        }
    } catch (error) {
        console.warn("Data transaksi lokal tidak dapat dibaca.", error);
    }

    return TRANSAKSI_AWAL.map((transaksi) => ({ ...transaksi }));
}

let transaksiNataFin = muatTransaksi();
let idTransaksiDiedit = null;

function simpanTransaksi() {
    try {
        localStorage.setItem(
            NATAFIN_STORAGE_KEY,
            JSON.stringify(transaksiNataFin)
        );
    } catch (error) {
        console.warn("Data transaksi tidak dapat disimpan di browser.", error);
    }
}

function formatRupiah(nominal) {
    const angka = Number(nominal) || 0;

    return "Rp" + new Intl.NumberFormat("id-ID", {
        maximumFractionDigits: 0
    }).format(Math.abs(angka));
}

function formatNominalTransaksi(transaksi) {
    const tanda = transaksi.type === "pemasukan" ? "+" : "−";

    return tanda + formatRupiah(transaksi.amount);
}

function formatTanggal(tanggal) {
    if (!tanggal) {
        return "-";
    }

    const bagianTanggal = tanggal.split("-").map(Number);

    if (
        bagianTanggal.length !== 3 ||
        bagianTanggal.some(Number.isNaN)
    ) {
        return tanggal;
    }

    const tanggalObjek = new Date(
        bagianTanggal[0],
        bagianTanggal[1] - 1,
        bagianTanggal[2]
    );

    return tanggalObjek.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function escapeHtml(teks) {
    const karakterKhusus = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#039;"
    };

    return String(teks ?? "").replace(
        /[&<>"']/g,
        (karakter) => karakterKhusus[karakter]
    );
}

function hitungRingkasan(dataTransaksi = transaksiNataFin) {
    let pemasukan = 0;
    let pengeluaran = 0;

    for (const item of dataTransaksi) {
        if (item.type === "pemasukan") {
            pemasukan += Number(item.amount) || 0;
        } else if (item.type === "pengeluaran") {
            pengeluaran += Number(item.amount) || 0;
        }
    }

    const saldo = pemasukan - pengeluaran - TOTAL_TABUNGAN;

    return {
        pemasukan,
        pengeluaran,
        tabungan: TOTAL_TABUNGAN,
        saldo
    };
}

function urutkanTransaksiTerbaru(dataTransaksi) {
    return [...dataTransaksi].sort(
        (a, b) => b.date.localeCompare(a.date) || b.id - a.id
    );
}

function buatBarisTransaksi(transaksi, denganAksi = false) {
    const jenis = transaksi.type === "pemasukan"
        ? "Pemasukan"
        : "Pengeluaran";

    const kelasBadge = transaksi.type === "pemasukan"
        ? "income-badge"
        : "expense-badge";

    const kelasNominal = transaksi.type === "pemasukan"
        ? "amount-income"
        : "amount-expense";

    const aksi = denganAksi
        ? `<td class="text-nowrap">
                <button type="button" class="btn btn-sm btn-outline-navy me-1" data-edit-transaction="${Number(transaksi.id)}">Edit</button>
                <button type="button" class="btn btn-sm btn-delete-transaction" data-delete-transaction="${Number(transaksi.id)}">Hapus</button>
            </td>`
        : "";

    const kelasBaris = denganAksi && Number(transaksi.id) === idTransaksiDiedit
        ? ' class="row-editing"'
        : "";

    return `
        <tr${kelasBaris}>
            <td>${escapeHtml(formatTanggal(transaksi.date))}</td>
            <td>${escapeHtml(transaksi.description)}</td>
            <td>${escapeHtml(transaksi.category)}</td>
            <td>
                <span class="transaction-badge ${kelasBadge}">
                    ${jenis}
                </span>
            </td>
            <td class="text-end ${kelasNominal}">
                ${formatNominalTransaksi(transaksi)}
            </td>
            ${aksi}
        </tr>
    `;
}

function renderRingkasan() {
    const ringkasan = hitungRingkasan();

    const elemenPemasukan = document.getElementById("totalPemasukan");
    const elemenPengeluaran = document.getElementById("totalPengeluaran");
    const elemenTabungan = document.getElementById("totalTabungan");
    const elemenSaldo = document.getElementById("sisaSaldo");

    if (elemenPemasukan) {
        elemenPemasukan.textContent = "+" + formatRupiah(ringkasan.pemasukan);
    }

    if (elemenPengeluaran) {
        elemenPengeluaran.textContent = "−" + formatRupiah(ringkasan.pengeluaran);
    }

    if (elemenTabungan) {
        elemenTabungan.textContent = formatRupiah(ringkasan.tabungan);
    }

    if (elemenSaldo) {
        elemenSaldo.textContent =
            (ringkasan.saldo < 0 ? "−" : "") + formatRupiah(ringkasan.saldo);
    }
}

function renderTransaksiDashboard() {
    const tubuhTabel = document.getElementById("dashboardTransactionBody");

    if (!tubuhTabel) {
        return;
    }

    const transaksiTerbaru = urutkanTransaksiTerbaru(
        transaksiNataFin
    ).slice(0, 4);

    if (transaksiTerbaru.length === 0) {
        tubuhTabel.innerHTML = `
            <tr>
                <td colspan="5" class="empty-state">
                    Belum ada transaksi.
                </td>
            </tr>
        `;
        return;
    }

    tubuhTabel.innerHTML = transaksiTerbaru
        .map((item) => buatBarisTransaksi(item))
        .join("");
}

function renderTargetDashboard() {
    const wadahTarget = document.getElementById("savingTargetsDashboard");

    if (!wadahTarget) {
        return;
    }

    let htmlTarget = "";

    for (const target of TARGET_TABUNGAN) {
        const persentase = target.target > 0
            ? Math.min(
                100,
                Math.round((target.saved / target.target) * 100)
            )
            : 0;

        htmlTarget += `
            <div class="saving-item">
                <div class="d-flex justify-content-between gap-2 mb-2">
                    <span class="saving-name">
                        ${escapeHtml(target.name)}
                    </span>
                    <span class="saving-percent">${persentase}%</span>
                </div>

                <div class="progress saving-progress"
                    role="progressbar"
                    aria-label="Tabungan ${escapeHtml(target.name)}"
                    aria-valuenow="${persentase}"
                    aria-valuemin="0"
                    aria-valuemax="100">
                    <div class="progress-bar" style="width: ${persentase}%"></div>
                </div>

                <p class="saving-detail">
                    ${formatRupiah(target.saved)} dari ${formatRupiah(target.target)}
                </p>
            </div>
        `;
    }

    wadahTarget.innerHTML = htmlTarget;
}

function renderTabelTransaksi() {
    const tubuhTabel = document.getElementById("allTransactionsBody");

    if (!tubuhTabel) {
        return;
    }

    const pencarian = (
        document.getElementById("searchTransaction")?.value || ""
    ).trim().toLowerCase();

    const filterJenis = document.getElementById("filterType")?.value || "semua";

    const hasilFilter = urutkanTransaksiTerbaru(transaksiNataFin).filter(
        (item) => {
            const teksTransaksi = `
                ${item.description}
                ${item.category}
                ${item.date}
            `.toLowerCase();

            const cocokPencarian = teksTransaksi.includes(pencarian);
            const cocokJenis =
                filterJenis === "semua" || item.type === filterJenis;

            return cocokPencarian && cocokJenis;
        }
    );

    const jumlahTransaksi = document.getElementById("transactionCount");

    if (jumlahTransaksi) {
        jumlahTransaksi.textContent =
            `${hasilFilter.length} transaksi ditampilkan`;
    }

    if (hasilFilter.length === 0) {
        tubuhTabel.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    Transaksi tidak ditemukan.
                </td>
            </tr>
        `;
        return;
    }

    tubuhTabel.innerHTML = hasilFilter
        .map((item) => buatBarisTransaksi(item, true))
        .join("");
}

function renderDetailKeuangan() {
    const ringkasan = hitungRingkasan();

    const targetPemasukan = document.getElementById("detailTotalPemasukan");
    const targetPengeluaran = document.getElementById("detailTotalPengeluaran");
    const targetTabungan = document.getElementById("detailTotalTabungan");
    const targetSaldo = document.getElementById("detailSisaSaldo");

    if (targetPemasukan) {
        targetPemasukan.textContent = "+" + formatRupiah(ringkasan.pemasukan);
    }

    if (targetPengeluaran) {
        targetPengeluaran.textContent = "−" + formatRupiah(ringkasan.pengeluaran);
    }

    if (targetTabungan) {
        targetTabungan.textContent = formatRupiah(ringkasan.tabungan);
    }

    if (targetSaldo) {
        targetSaldo.textContent =
            (ringkasan.saldo < 0 ? "−" : "") + formatRupiah(ringkasan.saldo);
    }

    const tubuhTransaksi = document.getElementById("detailTransactionsBody");

    if (tubuhTransaksi) {
        const dataTerurut = urutkanTransaksiTerbaru(transaksiNataFin);

        tubuhTransaksi.innerHTML = dataTerurut.length
            ? dataTerurut.map((item) => buatBarisTransaksi(item)).join("")
            : `
                <tr>
                    <td colspan="5" class="empty-state">
                        Belum ada transaksi.
                    </td>
                </tr>
            `;
    }

    const tubuhKategori = document.getElementById("expenseCategoryBody");

    if (tubuhKategori) {
        const totalKategori = {};

        for (const item of transaksiNataFin) {
            if (item.type === "pengeluaran") {
                totalKategori[item.category] =
                    (totalKategori[item.category] || 0) +
                    (Number(item.amount) || 0);
            }
        }

        const daftarKategori = Object.entries(totalKategori)
            .sort((a, b) => b[1] - a[1]);

        tubuhKategori.innerHTML = daftarKategori.length
            ? daftarKategori.map(([kategori, total]) => `
                <tr>
                    <td>${escapeHtml(kategori)}</td>
                    <td class="text-end amount-expense">
                        −${formatRupiah(total)}
                    </td>
                </tr>
            `).join("")
            : `
                <tr>
                    <td colspan="2" class="empty-state">
                        Belum ada pengeluaran.
                    </td>
                </tr>
            `;
    }

    const tubuhTarget = document.getElementById("savingTargetsDetail");

    if (tubuhTarget) {
        tubuhTarget.innerHTML = TARGET_TABUNGAN.map((target) => {
            const persentase = target.target > 0
                ? Math.min(
                    100,
                    Math.round((target.saved / target.target) * 100)
                )
                : 0;

            return `
                <tr>
                    <td>${escapeHtml(target.name)}</td>
                    <td class="text-end">${formatRupiah(target.target)}</td>
                    <td class="text-end">${formatRupiah(target.saved)}</td>
                    <td class="text-end">
                        ${formatRupiah(Math.max(0, target.target - target.saved))}
                    </td>
                    <td>${persentase}%</td>
                </tr>
            `;
        }).join("");
    }
}

function tampilkanPesan(pesan, jenis = "success") {
    const kotakPesan = $("#transactionMessage");

    if (!kotakPesan.length) {
        return;
    }

    kotakPesan
        .stop(true, true)
        .removeClass("alert-success alert-danger alert-warning d-none")
        .addClass(`alert alert-${jenis}`)
        .text(pesan)
        .hide()
        .fadeIn(200)
        .delay(3500)
        .fadeOut(300);
}

function tampilkanPesanAkun(pesan, jenis = "success") {
    const kotakPesan = $("#accountMessage");

    if (!kotakPesan.length) {
        return;
    }

    kotakPesan
        .stop(true, true)
        .removeClass("alert-success alert-danger alert-warning d-none")
        .addClass(`alert alert-${jenis}`)
        .text(pesan)
        .hide()
        .fadeIn(200);
}

function tanggalHariIni() {
    const sekarang = new Date();
    const tahun = sekarang.getFullYear();
    const bulan = String(sekarang.getMonth() + 1).padStart(2, "0");
    const hari = String(sekarang.getDate()).padStart(2, "0");

    return `${tahun}-${bulan}-${hari}`;
}

function isiPilihan(selector, nilai, cadangan) {
    const elemen = $(selector);

    elemen.val(nilai);

    if (elemen.val() === null) {
        elemen.val(cadangan);
    }
}

function masukModeEdit(idTransaksi) {
    const transaksi = transaksiNataFin.find(
        (item) => Number(item.id) === idTransaksi
    );

    if (!transaksi) {
        return;
    }

    idTransaksiDiedit = idTransaksi;

    isiPilihan("#transactionType", transaksi.type, "pengeluaran");
    isiPilihan("#transactionCategory", transaksi.category, "Lainnya");
    $("#transactionAmount").val(transaksi.amount);
    $("#transactionDate").val(transaksi.date);
    $("#transactionDescription").val(transaksi.description);

    $("#formTitle").text("Edit Transaksi");
    $("#submitTransactionBtn").text("Simpan Perubahan");
    $("#cancelEditBtn").removeClass("d-none");

    if (!$("#transactionFormFields").is(":visible")) {
        $("#transactionFormFields").slideDown(250);
        $("#toggleTransactionForm").text("Sembunyikan Form");
    }

    renderTabelTransaksi();

    $("html, body").stop(true).animate({
        scrollTop: $("#transactionForm").closest("section").offset().top - 80
    }, 250);
}

function keluarModeEdit(kosongkanForm = false) {
    idTransaksiDiedit = null;

    $("#formTitle").text("Form Transaksi");
    $("#submitTransactionBtn").text("Simpan Transaksi");
    $("#cancelEditBtn").addClass("d-none");

    if (kosongkanForm) {
        $("#transactionForm")[0].reset();
        $("#transactionDate").val(tanggalHariIni());
    }

    renderTabelTransaksi();
}

function renderSemua() {
    renderRingkasan();
    renderTransaksiDashboard();
    renderTargetDashboard();
    renderTabelTransaksi();
    renderDetailKeuangan();
}

$(document).ready(function () {
    renderSemua();

    if ($("#transactionDate").length && !$("#transactionDate").val()) {
        $("#transactionDate").val(tanggalHariIni());
    }

    $("#toggleTransactionTable").on("click", function () {
        const tombol = $(this);

        $("#dashboardTransactionsWrap")
            .stop(true, true)
            .slideToggle(250, function () {
                tombol.text(
                    $(this).is(":visible")
                        ? "Sembunyikan Transaksi"
                        : "Tampilkan Transaksi"
                );
            });
    });

    $("#toggleTransactionForm").on("click", function () {
        const tombol = $(this);

        $("#transactionFormFields")
            .stop(true, true)
            .slideToggle(250, function () {
                tombol.text(
                    $(this).is(":visible")
                        ? "Sembunyikan Form"
                        : "Tampilkan Form"
                );
            });
    });

    $("#searchTransaction, #filterType").on("input change", function () {
        renderTabelTransaksi();
    });

    $("#transactionForm").on("submit", function (event) {
        event.preventDefault();

        const jenis = $("#transactionType").val();
        const kategori = $("#transactionCategory").val();
        const nominal = Number($("#transactionAmount").val());
        const tanggal = $("#transactionDate").val();
        const keterangan = $("#transactionDescription").val().trim();

        if (
            !jenis ||
            !kategori ||
            !tanggal ||
            !keterangan ||
            $("#transactionAmount").val().trim() === ""
        ) {
            tampilkanPesan(
                "Lengkapi semua kolom transaksi terlebih dahulu.",
                "warning"
            );
            return;
        }

        if (!Number.isFinite(nominal) || nominal <= 0) {
            tampilkanPesan(
                "Nominal harus berupa angka lebih dari 0.",
                "warning"
            );
            return;
        }

        if (idTransaksiDiedit !== null) {
            const transaksiLama = transaksiNataFin.find(
                (item) => Number(item.id) === idTransaksiDiedit
            );

            if (transaksiLama) {
                transaksiLama.date = tanggal;
                transaksiLama.type = jenis;
                transaksiLama.category = kategori;
                transaksiLama.description = keterangan;
                transaksiLama.amount = nominal;
            }

            simpanTransaksi();
            keluarModeEdit(true);
            renderSemua();

            tampilkanPesan("Transaksi berhasil diperbarui.", "success");
            return;
        }

        const transaksiBaru = {
            id: Date.now(),
            date: tanggal,
            type: jenis,
            category: kategori,
            description: keterangan,
            amount: nominal
        };

        transaksiNataFin.push(transaksiBaru);
        simpanTransaksi();
        renderSemua();

        this.reset();
        $("#transactionDate").val(tanggalHariIni());

        tampilkanPesan(
            "Transaksi berhasil ditambahkan ke data lokal NataFin.",
            "success"
        );
    });

    $("#transactionForm").on("reset", function () {
        if (idTransaksiDiedit !== null) {
            keluarModeEdit();
        }

        setTimeout(function () {
            $("#transactionDate").val(tanggalHariIni());
        }, 0);
    });

    $("#cancelEditBtn").on("click", function () {
        keluarModeEdit(true);
        tampilkanPesan("Edit transaksi dibatalkan.", "warning");
    });

    $(document).on("click", "[data-edit-transaction]", function () {
        masukModeEdit(Number($(this).attr("data-edit-transaction")));
    });

    $("#loginForm").on("submit", function (event) {
        event.preventDefault();

        const email = $("#email").val().trim();
        const password = $("#password").val();

        if (!email || !password) {
            tampilkanPesanAkun(
                "Email dan kata sandi wajib diisi.",
                "warning"
            );
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            tampilkanPesanAkun("Format email belum benar.", "warning");
            return;
        }

        tampilkanPesanAkun(
            "Validasi berhasil. Login belum terhubung ke backend.",
            "success"
        );
    });

    $("#registerForm").on("submit", function (event) {
        event.preventDefault();

        const nama = $("#nama").val().trim();
        const email = $("#email").val().trim();
        const password = $("#password").val();
        const konfirmasi = $("#konfirmasi").val();

        if (!nama || !email || !password || !konfirmasi) {
            tampilkanPesanAkun(
                "Lengkapi semua kolom pendaftaran.",
                "warning"
            );
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            tampilkanPesanAkun("Format email belum benar.", "warning");
            return;
        }

        if (password.length < 8) {
            tampilkanPesanAkun(
                "Kata sandi minimal 8 karakter.",
                "warning"
            );
            return;
        }

        if (password !== konfirmasi) {
            tampilkanPesanAkun(
                "Konfirmasi kata sandi belum sama.",
                "warning"
            );
            return;
        }

        tampilkanPesanAkun(
            "Validasi pendaftaran berhasil. Data belum disimpan ke server.",
            "success"
        );
    });

    $("#profileForm").on("submit", function (event) {
        event.preventDefault();

        const nama = $("#nama").val().trim();
        const email = $("#email").val().trim();

        if (!nama || !email) {
            tampilkanPesanAkun(
                "Nama lengkap dan email wajib diisi.",
                "warning"
            );
            return;
        }

        tampilkanPesanAkun(
            "Validasi berhasil. Profil belum disimpan ke backend.",
            "success"
        );
    });

    $("#confirmLogout").on("click", function () {
        window.location.href = "login.html";
    });

    $(document).on("click", "[data-delete-transaction]", function () {
        const idTransaksi = Number(
            $(this).attr("data-delete-transaction")
        );

        const transaksiDihapus = transaksiNataFin.find(
            (item) => Number(item.id) === idTransaksi
        );

        if (!transaksiDihapus) {
            return;
        }

        if (
            window.confirm(
                `Hapus transaksi "${transaksiDihapus.description}"?`
            )
        ) {
            transaksiNataFin = transaksiNataFin.filter(
                (item) => Number(item.id) !== idTransaksi
            );

            simpanTransaksi();

            if (idTransaksi === idTransaksiDiedit) {
                keluarModeEdit(true);
            }

            renderSemua();
            tampilkanPesan("Transaksi berhasil dihapus.", "success");
        }
    });
});