import { ChangeEvent, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";  // Importe Buffer diretamente

function ipfs() {

const handleIpfs = async (e: ChangeEvent<HTMLInputElement>) => {
    
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Select file");
      return
    }

    console.log(e.target.files);

    // Lendo o arquivo
    const file = e.target.files[0];
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    try {
      if (!file || !file.name || file.size > 500000) {
        throw new Error("File data are missing or too big" );
      }
      console.log(`File: ${file.name} - Size: ${file.size}`);

      interface T {
        path: ServerData;
      }
      interface ServerData {
        data: string
      }

      // Usando INFURA
      console.log('INFURA');

      const projectId = '';
      const projectSecret = '';
      const auth = 'Basic ' + btoa(projectId + ':' + projectSecret);

      const ipfs = create({
          host: 'ipfs.infura.io',
          port: 5001,
          protocol: 'https',
          timeout: 10000,
          headers: {
              authorization: auth,
          },
      });

      const result = await ipfs.add(bytes);
      console.log('File uploaded:', result);
      const fileUrl = `https://ipfs.io/ipfs/${result.path}`;
      console.log('File URL:', fileUrl);

      toast.success('Arquivo enviado com sucesso para o IPFS!');

    } catch (e: any) {
      console.error('Error uploading file: ', e);
      toast.error('Erro ao enviar arquivo: ' + e.message);
    }

  }

  return (
    <div>
      <input type="file" onChange={handleIpfs} />
    </div>
  )
}

export default ipfs;