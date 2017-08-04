/**
 * Created by ww on 2017/7/31.
 */
import {replaceSrc} from 'utils/utilities';

export default {
  radio: {
    result: '-1',
    // saveData(state, url, type){
    //   let data = {
    //     title: document.title,
    //     topic: replaceSrc(state.topic, url, true),
    //     options: (function () {
    //       let options = [];
    //       state.options.forEach((item, index) => {
    //         let option = {
    //           icon: item.icon,
    //           text: replaceSrc(item.text, url, true),
    //           id: item.id
    //         };
    //         options.push(option);
    //       });
    //       return options;
    //     })(),
    //     answer: state.answer,
    //     hint: replaceSrc(state.hint, url, true),
    //     explanation: replaceSrc(state.explanation, url, true),
    //     questionType: type
    //   };
    //   data = JSON.stringify(data); // 保存服务器
    //
    //   let localData = {
    //     title: document.title,
    //     topic: state.topic.trim(),
    //     options: (function () {
    //       let options = [];
    //       state.options.forEach((item, index) => {
    //         let option = {
    //           icon: item.icon,
    //           text: item.text.trim(),
    //           id: item.id
    //         };
    //         options.push(option);
    //       });
    //       return options;
    //     })(),
    //     answer: state.answer,
    //     hint: state.hint.trim(),
    //     explanation: state.explanation.trim(),
    //     questionType: type
    //   };
    //   console.log(localData);
    //   localData = JSON.stringify(localData);
    //   return {
    //     webData: data,
    //     localData: localData
    //   };
    // },
    save(){

    },
    getResult(_self){
      let answer = _self.questionData.answer.charCodeAt(0) - 65;
      let result = _self.$store.state.result;
      if (result === '-1') {
        return -1;
      } else if (result === answer) {
        return 1;
      } else {
        return 0;
      }
    },
    submit(_self, res) {
      switch (res) {
        case -1:
          _self.$Modal.warning({
            title: '',
            content: `<p>这道题没有作答！</p>`
          });
          break;
        case 0:
          _self.$Modal.error({
            title: '',
            content: `<p>这道题没有答对，下次加油哦！</p>`
          });
          break;
        case 1:
          _self.$Modal.success({
            title: '',
            content: `<p>太棒了，您答对了！</p>`
          });
          break;
      }
    }
  },
  checkbox: {
    result: [],
    saveData(state, url, type){
      let data = {
        title: document.title,
        topic: replaceSrc(state.topic, url, true),
        options: (function () {
          let options = [];
          state.options.forEach((item, index) => {
            let option = {
              icon: item.icon,
              text: replaceSrc(item.text, url, true),
              id: item.id
            };
            options.push(option);
          });
          return options;
        })(),
        answer: state.answer,
        hint: replaceSrc(state.hint, url, true),
        explanation: replaceSrc(state.explanation, url, true),
        questionType: type,
      };
      data = JSON.stringify(data); // 保存服务器

      let localData = {
        title: document.title,
        topic: state.topic.trim(),
        options: (function () {
          let options = [];
          state.options.forEach((item, index) => {
            let option = {
              icon: item.icon,
              text: item.text.trim(),
              id: item.id
            };
            options.push(option);
          });
          return options;
        })(),
        answer: state.answer,
        hint: state.hint.trim(),
        explanation: state.explanation.trim(),
        questionType: type,
      };
      localData = JSON.stringify(localData);
      return {
        webData: data,
        localData: localData
      };
    },
    getResult(_self){
      let res = _self.$store.state.result;
      let answer = _self.questionData.answer;
      if (res.length === 0) return -1;
      if (res.length !== answer.length) return 0;
      for (let i = 0; i < res.length; i++) {
        let resCode = String.fromCharCode(res[i] + 65);
        if (answer.indexOf(resCode) === -1) return 0;
      }
      return 1;
    },
    submit(_self, res) {
      switch (res) {
        case -1:
          _self.$Modal.warning({
            title: '',
            content: `<p>这道题没有作答！</p>`
          });
          break;
        case 0:
          _self.$Modal.error({
            title: '',
            content: `<p>这道题没有答对，下次加油哦！</p>`
          });
          break;
        case 1:
          _self.$Modal.success({
            title: '',
            content: `<p>太棒了，您答对了！</p>`
          });
          break;
      }
    }
  },
  fillBlank: {
    result: [],
    saveData(state, url, type){
      let data = {
        title: document.title,
        topic: replaceSrc(state.topic, url, true),
        blanks: (function () {
          let options = [];
          state.options.forEach((item, index) => {
            let option = {
              icon: item.icon,
              text: replaceSrc(item.text, url, true),
            };
            options.push(option);
          });
          return options;
        })(),
        hint: replaceSrc(state.hint, url, true),
        explanation: replaceSrc(state.explanation, url, true),
        questionType: type,
      };
      data = JSON.stringify(data); // 保存服务器

      let localData = {
        title: document.title,
        topic: state.topic.trim(),
        blanks: (function () {
          let options = [];
          state.options.forEach((item, index) => {
            let option = {
              icon: item.icon,
              text: item.text.trim(),
            };
            options.push(option);
          });
          return options;
        })(),
        hint: state.hint.trim(),
        explanation: state.explanation.trim(),
        questionType: type,
      };
      localData = JSON.stringify(localData);
      return {
        webData: data,
        localData: localData
      };
    },
    getResult(_self){
      let res = _self.$store.state.result;
      let answer = _self.questionData.blanks;
      if (res.length === 0) return -1;
      if (res.length !== answer.length) return 0;
      for (let i = 0; i < res.length; i++) {
        if (res[i] !== answer[i].text) return 0;
      }
      return 1;
    },
    submit(_self, res) {
      switch (res) {
        case -1:
          _self.$Modal.warning({
            title: '',
            content: `<p>这道题没有作答！</p>`
          });
          break;
        case 0:
          _self.$Modal.error({
            title: '',
            content: `<p>这道题没有答对，下次加油哦！</p>`
          });
          break;
        case 1:
          _self.$Modal.success({
            title: '',
            content: `<p>太棒了，您答对了！</p>`
          });
          break;
      }
    }
  },
  judge: {
    result:'-1',
    saveData(state, url, type){
      let data = {
        title: document.title,
        topic: replaceSrc(state.topic, url, true),
        answer:state.answer,
        hint: replaceSrc(state.hint, url, true),
        explanation: replaceSrc(state.explanation, url, true),
        questionType: type,
      };
      data = JSON.stringify(data); // 保存服务器

      let localData = {
        title: document.title,
        topic: state.topic.trim(),
        answer:state.answer,
        hint: state.hint.trim(),
        explanation: state.explanation.trim(),
        questionType: type,
      };
      localData = JSON.stringify(localData);
      return {
        webData: data,
        localData: localData
      };
    },
    getResult(_self){
      let res = _self.$store.state.result;
      let answer = _self.questionData.answer;
      if (res === '-1') return -1;
      if (res !== answer) return 0;

      return 1;
    },
    submit(_self, res) {
      switch (res) {
        case -1:
          _self.$Modal.warning({
            title: '',
            content: `<p>这道题没有作答！</p>`
          });
          break;
        case 0:
          _self.$Modal.error({
            title: '',
            content: `<p>这道题没有答对，下次加油哦！</p>`
          });
          break;
        case 1:
          _self.$Modal.success({
            title: '',
            content: `<p>太棒了，您答对了！</p>`
          });
          break;
      }
    }
  },
  comprehensive:{
    result:'-1',

    saveData(state, url, type){
      let data = {
        title: document.title,
        topic: replaceSrc(state.topic, url, true),
        answer:state.answer,
        hint: replaceSrc(state.hint, url, true),
        explanation: replaceSrc(state.explanation, url, true),
        questionType: type,
      };
      data = JSON.stringify(data); // 保存服务器

      let localData = {
        title: document.title,
        topic: state.topic.trim(),
        answer:state.answer,
        hint: state.hint.trim(),
        explanation: state.explanation.trim(),
        questionType: type,
      };
      localData = JSON.stringify(localData);
      return {
        webData: data,
        localData: localData
      };
    },
    getResult(_self){
      let res = _self.$store.state.result;
      let answer = _self.questionData.answer;
      if (res === '-1') return -1;
      if (res !== answer) return 0;

      return 1;
    },
    submit(_self, res) {
      switch (res) {
        case -1:
          _self.$Modal.warning({
            title: '',
            content: `<p>这道题没有作答！</p>`
          });
          break;
        case 0:
          _self.$Modal.error({
            title: '',
            content: `<p>这道题没有答对，下次加油哦！</p>`
          });
          break;
        case 1:
          _self.$Modal.success({
            title: '',
            content: `<p>太棒了，您答对了！</p>`
          });
          break;
      }
    }
  }
};
