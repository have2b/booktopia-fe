import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseJwt (token: string) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
export function isAdmin (roles: string[] | null| undefined) {
  if(roles){
    return roles.includes("Admin");
  }
  return false;
}
export const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function encodeQueryString(params: { [key: string]: any } | undefined): string {
  const queryStringParts: string[] = [];

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            queryStringParts.push(
              `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
            );
          });
        } else if (typeof value === "object") {
          // Handle nested objects
          for (const nestedKey in value) {
            if (value.hasOwnProperty(nestedKey)) {
              const nestedValue = value[nestedKey];
              if (nestedValue !== undefined) {
                queryStringParts.push(
                  `${encodeURIComponent(key)}[${encodeURIComponent(
                    nestedKey
                  )}]=${encodeURIComponent(nestedValue)}`
                );
              }
            }
          }
        } else {
          queryStringParts.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          );
        }
      }
    }
  }

  return queryStringParts.join("&");
}
