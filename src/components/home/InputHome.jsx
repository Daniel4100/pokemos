import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNameGlobal } from "../../store/slices/nameUser.slice";

const typeImages = new URL("../../media", import.meta.url).href;

const InputHome = () => {
  const { handleSubmit, reset, register } = useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submit = (data) => {
    dispatch(setNameGlobal(data.nameUser));
    reset({
      nameUser: "",
    });
    navigate("/pokedex");
  };

  return (
    <div className="container-home__form">
      
      <form onSubmit={handleSubmit(submit)}>
        <input
          placeholder="Ingresa tu nombre de entrenador"
          type="text"
          {...register("nameUser")}
        />
        <button className="custom-btn btn-11">
          Go to pokedex 
          <div className="dot"></div>
        </button>
      </form>
      <div className="container-home__image">
        <h2>¡Hola <br /> Entrenador!</h2>
        <img src={`${typeImages}/home.png`} className="home-image" alt="logo" />
      </div>
    </div>
  );
};

export default InputHome;
