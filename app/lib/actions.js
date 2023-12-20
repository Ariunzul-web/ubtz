"use server";

import { revalidatePath } from "next/cache";
import { Gologdol, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";

export const addUser = async (formData) => {
  const { email, password, alba, albanTushaal,lastname,firstname, phone, mobile, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      alba,
      albanTushaal,
      lastname,
      firstname,
      phone,
      mobile,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const { id, email, password, alba, albanTushaal,lastname,firstname, phone, mobile, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      email,
      password,
      alba,
      albanTushaal,
      lastname,
      firstname,
      phone,
      mobile,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addGologdol = async (formData) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const newGologdol = new Gologdol({
      title,
      desc,
      price,
      stock,
      color,
      size,
    });

    await newGologdol.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create gologdol!");
  }

  revalidatePath("/dashboard/gologdols");
  redirect("/dashboard/gologdols");
};

export const updateGologdol = async (formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Gologdol.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update gologdol!");
  }

  revalidatePath("/dashboard/gologdols");
  redirect("/dashboard/gologdols");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/users");
};

export const deleteGologdol = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Gologdol.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete gologdol!");
  }

  revalidatePath("/dashboard/gologdols");
};

export const authenticate = async (prevState, formData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { email, password });
  } catch (err) {
    return "Wrong Credentials!";
  }
};
