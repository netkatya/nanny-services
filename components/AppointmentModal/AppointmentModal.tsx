"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { toast } from "sonner";

import { AppointmentFormData, Nanny } from "@/types/nanny";
import { appointmentSchema } from "@/validation/validation";
import { useModalClose } from "@/hooks/useModalClose";

interface AppointmentModalProps {
  nanny: Nanny;
  onClose: () => void;
}

export default function AppointmentModal({
  nanny,
  onClose,
}: AppointmentModalProps) {
  const { handleBackdropClick } = useModalClose({ onClose });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: yupResolver(appointmentSchema),
  });

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      console.log("Appointment submitted:", data);
      toast.success("Appointment request sent!");
      reset();
      onClose();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="backdrop" onClick={handleBackdropClick}>
      <div className="relative bg-background md:max-w-150 max-h-226.75 rounded-[30px] p-6 md:p-16 mx-4 md:mx-0">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="font-medium text-3xl lg:text-[40px] leading-[120%] tracking-[-0.02em] mb-5 max-w-100">
          Make an appointment with a babysitter
        </h2>

        <p className="font-normal text-[14px] md:text-[16px] leading-[125%] text-(--text1) mb-5">
          Arranging a meeting with a caregiver for your child is the first step
          to creating a safe and comfortable environment. Fill out the form
          below so we can match you with the perfect care partner.
        </p>

        {/* Nanny info */}
        <div className="flex gap-3.5 items-center mb-5">
          <Image
            src={nanny.avatar_url}
            alt={nanny.name}
            width={44}
            height={44}
            className="rounded-[14px]"
          />
          <div>
            <p className="text-(--grey-text) font-medium text-[12px] leading-[133%] mb-1">
              Your nanny
            </p>
            <p className="font-medium text-[16px] leading-[150%]">
              {nanny.name}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-1"
          noValidate
        >
          {/* Address + Phone */}
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="h-17.5">
                <input
                  {...register("address")}
                  type="text"
                  placeholder="Address"
                  className="input focus:outline-none"
                />
                {errors.address && (
                  <p className="text-red-500 text-[14px]">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="h-17.5">
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+380"
                  className="input focus:outline-none"
                />
                {errors.phone && (
                  <p className="text-red-500 text-[14px]">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Child Age + Time */}
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="h-17.5">
                <input
                  {...register("childAge")}
                  type="text"
                  placeholder="Child's age"
                  className="input focus:outline-none"
                />
                {errors.childAge && (
                  <p className="text-red-500 text-[14px]">
                    {errors.childAge.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="h-17.5">
                <input
                  {...register("time")}
                  type="time"
                  className="input focus:outline-none"
                  defaultValue="00:00"
                  step={1800}
                />
                {errors.time && (
                  <p className="text-red-500 text-[14px]">
                    {errors.time.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="h-17.5">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="input focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-[14px]">{errors.email.message}</p>
            )}
          </div>

          {/* Parent Name */}
          <div className="h-17.5">
            <input
              {...register("parentName")}
              type="text"
              placeholder="Father's or mother's name"
              className="input focus:outline-none"
            />
            {errors.parentName && (
              <p className="text-red-500 text-[14px]">
                {errors.parentName.message}
              </p>
            )}
          </div>

          {/* Comment */}
          <div className="h-29 mb-4.5">
            <textarea
              {...register("comment")}
              placeholder="Comment"
              className="border border-[rgba(17,16,28,0.1)] rounded-xl p-4 w-full h-full resize-none focus:outline-none"
            />
            {errors.comment && (
              <p className="text-red-500 text-[14px]">
                {errors.comment.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="green-button py-4 font-medium leading-[125%] tracking-[-0.01em]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
