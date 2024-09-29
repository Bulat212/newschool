(function () {
  function skillsChart() {
    if (!document.getElementById("skills_diagram")) return;
    const ctx = document.getElementById("skills_diagram").getContext("2d");
    const skillsChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["JS", "PYTHON", "C++", "Java", "C#"],
        datasets: [
          {
            label: "Мои навыки %",
            data: [40, 30, 50, 40, 60],
            backgroundColor: "rgba(137, 246, 150, 0.2)",
            borderColor: "rgba(137, 246, 150, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              display: false,
            },
          },
        },
      },
    });
  }
  function expChart() {
    if (!document.getElementById("exp_diagram")) return;
    const ctx = document.getElementById("exp_diagram").getContext("2d");
    const expChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["04.09", "14.09", "20.09", "26.09", "06.10"],
        datasets: [
          {
            label: "ОПЫТ",
            data: [20, 30, 50, 40, 60, 80],
            borderColor: "rgba(0, 128, 0, 1)",
            backgroundColor: "rgba(0, 128, 0, 0.2)",
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          y: {},
        },
      },
    });
  }
  skillsChart();
  expChart();

  // ТАБЫ
  function tabsController() {
    var tabs = document.querySelectorAll(".tabs");
    for (var i = 0; i < tabs.length; i++) {
      let tabChilds = tabs[i].children;
      const tabsLine = document.createElement("div");
      tabsLine.className = "tabs-line";

      tabs[i].appendChild(tabsLine);
      for (var j = 0; j < tabChilds.length; j++) {
        if (tabChilds[j].className.includes("tab-active")) {
          tabsLine.style.left = tabChilds[j].offsetLeft + "px";
          tabsLine.style.width = tabChilds[j].offsetWidth + "px";
          break;
        }
      }
    }

    for (var i = 0; i < tabs.length; i++) {
      tabs[i].onclick = function (e) {
        const tabChilds = e.target.parentNode.children;

        let contentTab;
        for (let i = 0; i < tabChilds.length; i++) {
          tabChilds[i].classList.remove("tab-active");
        }
        e.target.classList.add("tab-active");
        for (var i = 0; i < e.target.parentNode.children.length; i++) {
          if (e.target.parentNode.children[i].className.includes("tabs-line")) {
            e.target.parentNode.children[i].style.left =
              e.target.offsetLeft + "px";
            e.target.parentNode.children[i].style.width =
              e.target.offsetWidth + "px";
            break;
          }
        }
        const tabContentChilds = Array.from(
          e.target.parentNode.parentNode.children
        ).find((el) => {
          return el.className.includes("tabs-content");
        })?.children;
        if (tabContentChilds == undefined) return;
        contentTab = e.target.dataset.tab;
        for (let i = 0; i < tabContentChilds.length; i++)
          tabContentChilds[i].classList.remove("tab-content-active");
        for (let i = 0; i < tabContentChilds.length; i++)
          if (tabContentChilds[i].dataset.tabContent == contentTab)
            tabContentChilds[i].classList.add("tab-content-active");
      };
    }
  }
  tabsController();

  // ПОИСК
  let search = document.getElementById("search-activity");
  search.getElementsByClassName("search__icon")[0].onclick = function (e) {
    if (search.className.includes("search-active"))
      search.classList.remove("search-active");
    else search.classList.add("search-active");
  };



  // РЕДАКТОР КОДА
  if (document.getElementById("code")) {
    const EDITOR = CodeMirror.fromTextArea(document.getElementById("code"), {
      lineNumbers: true, // Показывать номера строк
      mode: "javascript", // Установка режима подсветки синтаксиса на JavaScript
      theme: "dracula", // Тема оформления (можно изменить на другую)
      matchBrackets: true, // Подсветка соответствующих скобок
      autoCloseBrackets: true, // Автоматическое закрытие скобок
      viewportMargin: Infinity,
    });
    EDITOR.setValue(
      "function sum(a,b) {\n\treturn a+b;\n}\nconsole.log(sum(5,6);\n //Этот код добавляется через js"
    );
    // Массив языков
    const supportedLanguages = {
      "c++": "text/x-c++src",
      js: "javascript",
      python: "python",
    };

    selectUI.subscribe((value) => {
      EDITOR.setOption("mode", supportedLanguages[value]);
    });
  }

})();
