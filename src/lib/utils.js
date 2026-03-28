import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
}

import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

// Mock Database Utility
export const initDB = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
      { email: 'superadmin@gmail.com', password: 'Admin@123' }
    ]));
  }
};

export const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem('users')) || [];
  } catch (e) {
    return [];
  }
};

export const updatePassword = (email, newPassword) => {
  const users = getUsers();
  const index = users.findIndex(u => u.email === email);
  if (index > -1) {
    users[index].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }
  return false;
};
