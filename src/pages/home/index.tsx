import style from "./index.module.css";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { toast } from "react-toastify";

interface ResponseListFiles {
  medias: string[];
}

export function Home() {
  const [listFiles, setListFiles] = useState<string[]>();

  const getListFiles = async () => {
    try {
      const { data } = await axios.get<ResponseListFiles>(
        `${import.meta.env.VITE_SERVER_URL}/file/list/example`
      );
      const listFilesMp4 = data.medias.filter((name) => name.includes(".mp4"));
      setListFiles(listFilesMp4);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListFiles().catch((error) => {
      console.log(error);
    });
  }, []);

  const onUploadFile = async () => {
    const videoFile = document.querySelector<HTMLInputElement>("#videoFile");
    if (videoFile && videoFile.files && videoFile.files[0]) {
      const formData = new FormData();
      formData.append("client", "example");
      formData.append("file", videoFile.files[0]);

      await toast.promise(
        axios.post(`${import.meta.env.VITE_SERVER_URL}/file`, formData),
        {
          pending: "Subindo arquivo, aguarde 📡",
          success: {
            render: () => {
              setTimeout(() => {
                getListFiles();
              }, 3000);
              return "Arquivo salvo com sucesso!! 🎉";
            },
          },
          error: {
            render(error) {
              return `Erro: ${error}`;
            },
          },
        },
        {
          theme: "colored",
        }
      );
    }
  };

  const removeMedia = async (name: string) => {
    if (confirm(`Deseja remover o video ${name}??`)) {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/file`, {
        data: {
          client: "example",
          name,
        },
      });

      await getListFiles();
    }
  };

  const updateVitrine = async () => {
    const checkBoxs = document.querySelectorAll<HTMLInputElement>(
      "input[type='checkbox']"
    );

    const fileNames: string[] = [];

    checkBoxs.forEach((checkbox) => {
      if (checkbox.checked) {
        fileNames.push(checkbox.id.replace("video-", ""));
      }
    });

    if (fileNames.length) {
      await toast.promise(
        axios.post(`${import.meta.env.VITE_SERVER_URL}/file/generate`, {
          client: "example",
          fileNames,
        }),
        {
          pending: "Atualizando vitrine, aguarde 📡",
          success: {
            render() {
              checkBoxs.forEach((checkbox) => {
                if (checkbox.checked) {
                  checkbox.checked = false;
                }
              });
              return "Vitrine atualizada ✅";
            },
          },
        }
      );
    }
  };

  return (
    <main className={style.homeContainer}>
      <section>
        <ul>
          {listFiles &&
            listFiles.map((name) => (
              <li>
                <button onClick={() => removeMedia(name)}>
                  <FaX />
                </button>
                <video
                  controls
                  src={`${
                    import.meta.env.VITE_SERVER_URL
                  }/example/${name}#t=0.5`}
                  preload="metadata"
                ></video>
                <input type="checkbox" id={`video-${name}`} />
              </li>
            ))}
        </ul>
        <form onSubmit={(event: FormEvent) => event.preventDefault()}>
          <button onClick={() => updateVitrine()}>Atualizar Vitrine</button>
          <label htmlFor="videoFile">Subir arquivo</label>
          <input
            type="file"
            accept="video/mp4"
            id="videoFile"
            onChange={onUploadFile}
            style={{ display: "none" }}
          />
        </form>
      </section>
    </main>
  );
}
