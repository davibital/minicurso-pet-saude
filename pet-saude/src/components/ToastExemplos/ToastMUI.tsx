"use client";

import { useState } from "react";
import { Snackbar, Alert, Button, Stack, AlertColor } from "@mui/material";

export default function ToastMUI() {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [message, setMessage] = useState("");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const showToast = (type: AlertColor, msg: string) => {
    setSeverity(type);
    setMessage(msg);
    setOpen(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Exemplo de Toast - Material-UI</h2>

      <Stack spacing={2} direction="row" sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="success"
          onClick={() =>
            showToast("success", "Equipamento criado com sucesso!")
          }
        >
          Toast Sucesso
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => showToast("error", "Erro ao criar equipamento!")}
        >
          Toast Erro
        </Button>

        <Button
          variant="contained"
          color="warning"
          onClick={() => showToast("warning", "Equipamento em manutenção!")}
        >
          Toast Aviso
        </Button>

        <Button
          variant="contained"
          color="info"
          onClick={() => showToast("info", "Equipamento atualizado!")}
        >
          Toast Info
        </Button>
      </Stack>

      {/* Toast Component */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
