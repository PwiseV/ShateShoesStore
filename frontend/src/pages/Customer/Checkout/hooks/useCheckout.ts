import { useState } from "react";
import type { ShippingInfo } from "../types";
import type { CartItem } from "../../Cart/types";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../../services/fakeOrderService";

type FormErrors = Partial<Record<keyof ShippingInfo, string>> & {
    form?: string;
};

export const useCheckout = (
    items: CartItem[],
    total: number,
    discount: number,
    finalTotal: number
) => {
    const navigate = useNavigate();

    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        fullName: "",
        phone: "",
        address: "",
        note: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);

    // ===== UPDATE FIELD =====
    const updateField = (field: keyof ShippingInfo, value: string) => {
        setShippingInfo((prev) => ({ ...prev, [field]: value }));

        const fieldError = validateField(field, value);
        setErrors((prev) => ({
            ...prev,
            [field]: fieldError,
            form: undefined,
        }));
    };

    // ===== VALIDATE =====
    const validateField = (
        field: keyof ShippingInfo,
        value: string
    ): string | undefined => {
        switch (field) {
            case "fullName":
                if (!value.trim()) return "Vui lòng nhập họ tên";
                return;
            case "phone":
                if (!/^(0|\+84)\d{9}$/.test(value))
                    return "Số điện thoại không hợp lệ";
                return;
            case "address":
                if (!value.trim()) return "Vui lòng nhập địa chỉ";
                return;
            default:
                return;
        }
    };

    const validateAll = (): FormErrors => {
        const newErrors: FormErrors = {};

        (["fullName", "phone", "address"] as (keyof ShippingInfo)[]).forEach(
            (field) => {
                const error = validateField(field, shippingInfo[field] || "");
                if (error) newErrors[field] = error;
            }
        );

        if (items.length === 0) {
            newErrors.form = "Không có sản phẩm nào để đặt hàng";
        }

        return newErrors;
    };


    // ===== SUBMIT =====
    const submitOrder = async () => {
        const allErrors = validateAll();

        if (Object.keys(allErrors).length > 0) {
            setErrors(allErrors);
            return;
        }

        try {
            setLoading(true);

            const res = await createOrder({
                items,
                shippingInfo,
                total,
                discount,
                finalTotal,
            });

            if (res.success) {
                navigate("/order-success", {
                    state: { orderId: res.orderId },
                    replace: true,
                });
            }
        } catch {
            setErrors({ form: "Có lỗi xảy ra khi đặt hàng" });
        } finally {
            setLoading(false);
        }
    };

    return {
        shippingInfo,
        updateField,
        submitOrder,
        loading,
        errors,
    };
};
