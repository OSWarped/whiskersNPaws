(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_calendar_page_tsx_402286._.js", {

"[project]/app/calendar/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>CalendarPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/Alert/Alert.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$calendar$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/react-calendar/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/Button/Button.js [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Modal$2f$Modal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/Modal/Modal.js [app-client] (ecmascript) <export default as Modal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/FormControlLabel/FormControlLabel.js [app-client] (ecmascript) <export default as FormControlLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__ = __turbopack_import__("[project]/node_modules/@mui/material/Checkbox/Checkbox.js [app-client] (ecmascript) <export default as Checkbox>");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
function CalendarPage() {
    _s();
    const [bookings, setBookings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [services, setServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [addOns, setAddOns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pets, setPets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedService, setSelectedService] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedAddOns, setSelectedAddOns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedPets, setSelectedPets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [existingBookings, setExistingBookings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Fetch resources
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CalendarPage.useEffect": ()=>{
            const fetchResources = {
                "CalendarPage.useEffect.fetchResources": async ()=>{
                    try {
                        const token = localStorage.getItem('jwt');
                        if (!token) throw new Error('Authorization token not found');
                        const [servicesRes, addOnsRes, petsRes, reservationsRes] = await Promise.all([
                            fetch('/api/services'),
                            fetch('/api/addons'),
                            fetch('/api/pets/me', {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }),
                            fetch('/api/reservations', {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            })
                        ]);
                        if (!servicesRes.ok || !addOnsRes.ok || !petsRes.ok || !reservationsRes.ok) {
                            throw new Error('Failed to fetch one or more resources');
                        }
                        const [servicesData, addOnsData, petsData, reservationsData] = await Promise.all([
                            servicesRes.json(),
                            addOnsRes.json(),
                            petsRes.json(),
                            reservationsRes.json()
                        ]);
                        setServices(servicesData);
                        setAddOns(addOnsData);
                        setPets(petsData);
                        const formattedBookings = reservationsData.map({
                            "CalendarPage.useEffect.fetchResources.formattedBookings": (res)=>{
                                const serviceDetail = res.details.find({
                                    "CalendarPage.useEffect.fetchResources.formattedBookings.serviceDetail": (detail)=>detail.serviceId
                                }["CalendarPage.useEffect.fetchResources.formattedBookings.serviceDetail"]);
                                const addOnDetails = res.details.filter({
                                    "CalendarPage.useEffect.fetchResources.formattedBookings.addOnDetails": (detail)=>detail.addOnId
                                }["CalendarPage.useEffect.fetchResources.formattedBookings.addOnDetails"]);
                                return {
                                    startDate: res.startDate,
                                    service: serviceDetail?.serviceId || '',
                                    addOns: addOnDetails.map({
                                        "CalendarPage.useEffect.fetchResources.formattedBookings": (detail)=>detail.addOnId || ''
                                    }["CalendarPage.useEffect.fetchResources.formattedBookings"]),
                                    pets: res.pets.map({
                                        "CalendarPage.useEffect.fetchResources.formattedBookings": (pet)=>({
                                                id: pet.id,
                                                name: pet.name,
                                                type: pet.type,
                                                breed: pet.breed || '',
                                                specialNeeds: pet.specialNeeds || ''
                                            })
                                    }["CalendarPage.useEffect.fetchResources.formattedBookings"]),
                                    totalCost: res.totalCost || 0,
                                    details: res.details.map({
                                        "CalendarPage.useEffect.fetchResources.formattedBookings": (detail)=>({
                                                id: detail.id,
                                                reservationId: detail.reservationId,
                                                serviceId: detail.serviceId,
                                                addOnId: detail.addOnId,
                                                price: detail.price,
                                                quantity: detail.quantity
                                            })
                                    }["CalendarPage.useEffect.fetchResources.formattedBookings"])
                                };
                            }
                        }["CalendarPage.useEffect.fetchResources.formattedBookings"]);
                        setExistingBookings(formattedBookings);
                        setBookings(formattedBookings);
                    } catch (error) {
                        console.error('Error fetching resources:', error);
                        setError('Unable to load resources. Please try again.');
                    }
                }
            }["CalendarPage.useEffect.fetchResources"];
            fetchResources();
        }
    }["CalendarPage.useEffect"], []);
    const handleDateClick = (date)=>{
        setSelectedDate(date);
        // Find a booking for the selected date
        const booking = bookings.find((b)=>new Date(b.startDate).toDateString() === date.toDateString());
        if (booking) {
            // Extract service and add-ons from details
            const service = booking.details.find((detail)=>detail.serviceId)?.serviceId || null;
            const addOns = booking.details.filter((detail)=>detail.addOnId).map((detail)=>detail.addOnId);
            // Populate modal with booking details
            setSelectedService(service);
            setSelectedAddOns(addOns);
            setSelectedPets(booking.pets.map((pet)=>pet.id));
        } else {
            // Clear modal fields for a new reservation
            setSelectedService(null);
            setSelectedAddOns([]);
            setSelectedPets([]);
        }
        // Determine if the reservation is editable (only future dates are editable)
        const isEditable = date >= new Date();
        setError(!isEditable ? 'Past reservations cannot be edited.' : null);
        // Open the modal
        setIsModalOpen(true);
    };
    const handleSaveBooking = ()=>{
        if (!selectedDate || !selectedService || selectedPets.length === 0) {
            setError('Please select a service and at least one pet.');
            return;
        }
        const service = services.find((s)=>s.id === selectedService);
        const addOnsCost = selectedAddOns.reduce((sum, addOnId)=>{
            const addOn = addOns.find((a)=>a.id === addOnId);
            return sum + (addOn?.price || 0);
        }, 0);
        const totalCost = (service?.basePricePerDay || 0) + addOnsCost;
        const details = [
            {
                id: Math.random(),
                reservationId: 0,
                serviceId: selectedService,
                addOnId: null,
                price: service?.basePricePerDay || 0,
                quantity: 1
            },
            ...selectedAddOns.map((addOnId)=>{
                const addOn = addOns.find((a)=>a.id === addOnId);
                return {
                    id: Math.random(),
                    reservationId: 0,
                    serviceId: '',
                    addOnId,
                    price: addOn?.price || 0,
                    quantity: 1
                };
            })
        ];
        const newBooking = {
            startDate: selectedDate.toISOString(),
            service: selectedService,
            addOns: selectedAddOns,
            pets: selectedPets.map((id)=>pets.find((pet)=>pet.id === id)),
            totalCost,
            details
        };
        setBookings((prev)=>{
            const existingBookingIndex = prev.findIndex((b)=>new Date(b.startDate).toISOString() === newBooking.startDate);
            if (existingBookingIndex !== -1) {
                const updatedBookings = [
                    ...prev
                ];
                updatedBookings[existingBookingIndex] = newBooking;
                return updatedBookings;
            }
            return [
                ...prev,
                newBooking
            ];
        });
        setIsModalOpen(false);
        setError(null);
    };
    const handleCheckout = ()=>{
        const newBookings = bookings.filter((booking)=>!existingBookings.some((existing)=>existing.startDate === booking.startDate && existing.service === booking.service && JSON.stringify(existing.addOns) === JSON.stringify(booking.addOns) && JSON.stringify(existing.pets) === JSON.stringify(booking.pets)));
        if (newBookings.length === 0) {
            setError('No new reservations to check out.');
            return;
        }
        localStorage.setItem('bookings', JSON.stringify(newBookings));
        router.push('/checkout');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            p: 4
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                variant: "h4",
                align: "center",
                gutterBottom: true,
                children: "Book Your Pet Sitting Dates"
            }, void 0, false, {
                fileName: "[project]/app/calendar/page.tsx",
                lineNumber: 261,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                severity: "error",
                children: error
            }, void 0, false, {
                fileName: "[project]/app/calendar/page.tsx",
                lineNumber: 265,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$calendar$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"], {
                onClickDay: handleDateClick,
                tileClassName: ({ date })=>{
                    const booking = bookings.find((b)=>new Date(b.startDate).toDateString() === date.toDateString());
                    if (booking) {
                        return date < new Date() ? 'past-reservation' : 'future-reservation';
                    }
                    return '';
                },
                calendarType: "gregory"
            }, void 0, false, {
                fileName: "[project]/app/calendar/page.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                variant: "contained",
                color: "primary",
                sx: {
                    mt: 4
                },
                onClick: handleCheckout,
                disabled: bookings.length === 0,
                children: "Checkout"
            }, void 0, false, {
                fileName: "[project]/app/calendar/page.tsx",
                lineNumber: 279,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Modal$2f$Modal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
                open: isModalOpen,
                onClose: ()=>setIsModalOpen(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        p: 4,
                        borderRadius: 2,
                        width: 400,
                        boxShadow: 24
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "h6",
                            gutterBottom: true,
                            children: [
                                "Reservation Details for ",
                                selectedDate?.toDateString()
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/calendar/page.tsx",
                            lineNumber: 303,
                            columnNumber: 5
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "h6",
                            gutterBottom: true,
                            children: "Selected Service"
                        }, void 0, false, {
                            fileName: "[project]/app/calendar/page.tsx",
                            lineNumber: 308,
                            columnNumber: 5
                        }, this),
                        services.map((service)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                                control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
                                    checked: selectedService === service.id,
                                    onChange: ()=>setSelectedService(service.id),
                                    disabled: !!(selectedDate && selectedDate < new Date())
                                }, void 0, false, {
                                    fileName: "[project]/app/calendar/page.tsx",
                                    lineNumber: 315,
                                    columnNumber: 11
                                }, void 0),
                                label: `${service.name} ($${service.basePricePerDay.toFixed(2)})`
                            }, service.id, false, {
                                fileName: "[project]/app/calendar/page.tsx",
                                lineNumber: 312,
                                columnNumber: 7
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "h6",
                            gutterBottom: true,
                            sx: {
                                mt: 3
                            },
                            children: "Selected Add-Ons"
                        }, void 0, false, {
                            fileName: "[project]/app/calendar/page.tsx",
                            lineNumber: 326,
                            columnNumber: 5
                        }, this),
                        addOns.map((addOn)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                                control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
                                    checked: selectedAddOns.includes(addOn.id),
                                    onChange: ()=>setSelectedAddOns((prev)=>prev.includes(addOn.id) ? prev.filter((id)=>id !== addOn.id) : [
                                                ...prev,
                                                addOn.id
                                            ]),
                                    disabled: !!(selectedDate && selectedDate < new Date())
                                }, void 0, false, {
                                    fileName: "[project]/app/calendar/page.tsx",
                                    lineNumber: 333,
                                    columnNumber: 11
                                }, void 0),
                                label: `${addOn.name} ($${addOn.price.toFixed(2)})`
                            }, addOn.id, false, {
                                fileName: "[project]/app/calendar/page.tsx",
                                lineNumber: 330,
                                columnNumber: 7
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "h6",
                            gutterBottom: true,
                            sx: {
                                mt: 3
                            },
                            children: "Selected Pets"
                        }, void 0, false, {
                            fileName: "[project]/app/calendar/page.tsx",
                            lineNumber: 350,
                            columnNumber: 5
                        }, this),
                        pets.map((pet)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                                control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
                                    checked: selectedPets.includes(pet.id),
                                    onChange: ()=>setSelectedPets((prev)=>prev.includes(pet.id) ? prev.filter((id)=>id !== pet.id) : [
                                                ...prev,
                                                pet.id
                                            ]),
                                    disabled: !!(selectedDate && selectedDate < new Date())
                                }, void 0, false, {
                                    fileName: "[project]/app/calendar/page.tsx",
                                    lineNumber: 357,
                                    columnNumber: 11
                                }, void 0),
                                label: pet.name
                            }, pet.id, false, {
                                fileName: "[project]/app/calendar/page.tsx",
                                lineNumber: 354,
                                columnNumber: 7
                            }, this)),
                        selectedDate && selectedDate >= new Date() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                            variant: "contained",
                            color: "primary",
                            sx: {
                                mt: 2
                            },
                            onClick: handleSaveBooking,
                            children: "Save Changes"
                        }, void 0, false, {
                            fileName: "[project]/app/calendar/page.tsx",
                            lineNumber: 375,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/calendar/page.tsx",
                    lineNumber: 290,
                    columnNumber: 3
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/calendar/page.tsx",
                lineNumber: 289,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/calendar/page.tsx",
        lineNumber: 260,
        columnNumber: 5
    }, this);
}
_s(CalendarPage, "tYkMx2k99AKwd/Q1EkJd8aak1vU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CalendarPage;
var _c;
__turbopack_refresh__.register(_c, "CalendarPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/calendar/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_calendar_page_tsx_402286._.js.map