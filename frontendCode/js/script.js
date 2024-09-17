(function () {
  function skillsChart() {
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
          y: {
            
          },
          
        },
      },
    });
  }
  skillsChart();
  expChart();
})();
