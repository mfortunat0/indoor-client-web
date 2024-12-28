import style from "./index.module.css";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { FaX } from "react-icons/fa6";

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
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/file/generate`, {
        client: "example",
        fileNames,
      });

      checkBoxs.forEach((checkbox) => {
        if (checkbox.checked) {
          checkbox.checked = false;
        }
      });
      alert("Updated");
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
                  src={`${import.meta.env.VITE_SERVER_URL}/example/${name}`}
                ></video>
                <input type="checkbox" id={`video-${name}`} />
              </li>
            ))}
        </ul>
        <form onSubmit={(event: FormEvent) => event.preventDefault()}>
          <button onClick={() => updateVitrine()}>Atualizar Vitrine</button>
          <button>Subir arquivo</button>
        </form>
      </section>
    </main>
  );
}
