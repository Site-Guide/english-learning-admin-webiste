import { TextField, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ID } from "appwrite";
import * as React from "react";
import { database, storage } from "../../appwrite";
import { baseColor, secondBase } from "../../utils/constants";
import { MuiTextField } from "../auth/authStyle";
import { OptionAdd, OptionBox, OptionIndex } from "../Quiz/quiz";
import { getQuiz } from "../RealTimeFunctions/quiz";
import ClearIcon from "@mui/icons-material/Clear";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import UploadAudio from "./UploadAudio";

export default function AddQuizModel({
  open,
  handleClose,
  setQuizList,
  currentQuiz,
  quizList,
  currentContentId,
  setPrevQuiz,
}) {
  const [loading, setLoading] = React.useState(false);
  const [audio, setAudio] = React.useState(false);
  const [options, setOptions] = React.useState({});
  const [request, setRequest] = React.useState({
    question: "",
    options: "",
    audio: "",
    ans: "",
    index: currentContentId !== null ? -2 : quizList.length + 1,
    contentId: currentContentId,
  });
  const [currentAns, setCurrentAns] = React.useState(0);
  const [audioName, setAudioName] = React.useState("");

  const handleOptionChange = (value, key) => {
    var op = { ...options, [key]: value };
    setOptions({ ...op });
    setRequest({
      ...request,
      options: JSON.stringify(op),
    });
  };

  const handleQuiz = async () => {
    setLoading(true);
    if (currentQuiz.$id != null) {
      await database.updateDocument("main", "quiz_questions", currentQuiz.$id, {
        ...request,
      });
    } else {
      const req = {
        ...request,
        index: request.index == 0 ? quizList.length + 1 : request.index,
      };
      await database.createDocument("main", "quiz_questions", ID.unique(), req);
    }
    await getQuiz(setQuizList);
    if (setPrevQuiz != undefined) {
      setPrevQuiz(true);
    }
    setLoading(false);
    handleClose();
  };

  const getAudioFileName = async () => {
    const audioFile = await storage.getFile("audios", currentQuiz.audio);
    setAudioName(audioFile.name);
  };

  React.useEffect(() => {
    if (currentQuiz.options != null) {
      setCurrentAns(currentQuiz.ans);
      setOptions({ ...JSON.parse(currentQuiz.options) });
      setRequest({
        question: currentQuiz.question,
        options: currentQuiz.options,
        audio: currentQuiz.audio,
        ans: currentQuiz.ans,
        index: currentQuiz.index,
      });
    } else {
      setOptions({
        1: "",
      });
    }
  }, []);

  React.useEffect(() => {
    if (request.audio != "" && audioName == "") {
      getAudioFileName();
    }
  }, [request.audio]);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: "flex", alignItems: "center" }}>
        {currentQuiz.$id == null ? "Add Quiz" : "Edit Quiz"}
        <Tooltip
          title={audioName == "" ? "Upload audio file" : audioName}
          placement="right"
        >
          <LibraryMusicIcon
            onClick={() => setAudio(true)}
            style={{
              fontSize: "1.5rem",
              cursor: "pointer",
              color: baseColor,
              marginLeft: "20px",
            }}
          />
        </Tooltip>
        <TextField
          style={{ width: "10%", marginLeft: "auto" }}
          id="standard-basic"
          label="Index"
          variant="standard"
          autoFocus={false}
          value={request.index}
          type="number"
          onChange={(e) =>
            e.target.value > 0 &&
            setRequest({ ...request, index: e.target.value })
          }
        />
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{
            padding: "0.5rem 0",
          }}
        >
          {currentQuiz.$id == null ? (
            <TextField
              style={{ width: "100%", marginBottom: "20px" }}
              id="standard-basic"
              label="Add Question"
              variant="standard"
              autoFocus={false}
              multiline
              rows={3}
              value={request.question}
              onChange={(e) =>
                setRequest({ ...request, question: e.target.value })
              }
            />
          ) : (
            <p>{currentQuiz.question}</p>
          )}
          {Object.keys(options)?.map((op) => (
            <OptionBox key={op}>
              <Tooltip title="Mark as correct answer" placement="right">
                <OptionIndex
                  active={op === currentAns}
                  onClick={() => {
                    setCurrentAns(op);
                    setRequest({
                      ...request,
                      ans: op,
                    });
                  }}
                >
                  {op}
                </OptionIndex>
              </Tooltip>
              <MuiTextField
                style={{ width: "100%" }}
                id="standard-basic"
                label=""
                variant="standard"
                autoFocus={false}
                value={options[op]}
                onChange={(e) => handleOptionChange(e.target.value, op)}
              />
              <ClearIcon
                onClick={() => {
                  var _options = { ...options };
                  delete _options[op];
                  setRequest({ ...request, options: JSON.stringify(_options) });
                  setOptions(_options);
                  if (currentAns === op) {
                    setCurrentAns(0);
                    setRequest({ ...request, ans: 0 });
                  }
                }}
                style={{
                  fontSize: "1rem",
                  cursor: "pointer",
                  color: baseColor,
                }}
              />
            </OptionBox>
          ))}

          <OptionAdd
            onClick={() => {
              const o = {
                [Object.keys(options).length + 1]: "",
              };
              setOptions({ ...options, ...o });
            }}
          >
            + add more
          </OptionAdd>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button
          style={{ color: baseColor }}
          onClick={handleQuiz}
          disabled={
            request?.question == "" || currentAns == 0 || request.index == 0
          }
        >
          {loading
            ? currentQuiz.$id == null
              ? "Adding.."
              : "Updating.."
            : "Done"}
        </Button>
      </DialogActions>
      {audio && (
        <UploadAudio
          open={audio}
          handleClose={() => setAudio(false)}
          setRequest={setRequest}
          request={request}
          setAudioName={setAudioName}
        />
      )}
    </Dialog>
  );
}
