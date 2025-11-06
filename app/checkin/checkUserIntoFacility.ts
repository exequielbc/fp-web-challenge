"use server";

import z from "zod";
import { getFacilities } from "../utils/getFacilities";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

const facilities = getFacilities();

const checkInSchema = z.object({
  userId: z.string().min(1, { error: "User ID must be non empty" }),
  facilityId: z.string().min(1, { error: "Facility ID must be non empty" }),
});

export type CheckInSchema = z.infer<typeof checkInSchema>;

export async function checkUserIntoFacility(input: CheckInSchema) {
  const parseResult = await checkInSchema.safeParseAsync(input);
  if (!parseResult.success) {
    return {
      errors: z.treeifyError(parseResult.error),
    };
  }

  const { facilityId, userId } = parseResult.data;

  const facility = facilities.find((f) => f.id === facilityId);

  if (!facility) {
    return {
      error: `Facility with ID ${facilityId} does not exist`,
    };
  }

  const confirmationCode = await generateConfirmationCode();
  const newUrl = `/checkin/confirmation/${encodeURIComponent(
    facilityId
  )}/${encodeURIComponent(confirmationCode)}`;
  redirect(newUrl);
}

export async function generateConfirmationCode() {
  return nanoid(6);
}
