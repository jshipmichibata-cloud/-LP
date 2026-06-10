// 診断項目・質問・診断タイプはここに集約し、後から編集しやすくしています。
const categories = [
  {
    id: "recruiting",
    name: "採用AI活用度",
    description: "求人票、スカウト文、候補者対応、面接準備など採用業務でAIを活用できているか。",
    questions: [
      "求人票やスカウト文の作成にAIを活用している",
      "候補者対応、面接質問作成、選考準備などにAIを活用している"
    ]
  },
  {
    id: "development",
    name: "社員教育の活用度",
    description: "新入社員向け資料、研修資料、学習サポートにAIを活用できているか。",
    questions: [
      "新入社員向け資料や研修資料の作成にAIを活用している",
      "社員が学ぶための教材や確認テストの作成にAIを活用している"
    ]
  },
  {
    id: "evaluation",
    name: "評価・人員配置の活用度",
    description: "評価コメント、面談メモ、人員配置、社員の得意分野の整理にAIを安全に活用できているか。",
    questions: [
      "評価コメントや面談メモの整理にAIを活用できている",
      "社員の得意分野や配置を考えるための情報整理にAIを活用できている"
    ]
  },
  {
    id: "operations",
    name: "労務・社内問い合わせ",
    description: "社内制度、手続き、社員からの問い合わせ対応を効率化できているか。",
    questions: [
      "社内制度や労務手続きに関する問い合わせ対応をAIで効率化できている",
      "社員からよく聞かれる質問と回答を整理できている"
    ]
  },
  {
    id: "retention",
    name: "離職防止・社員の声",
    description: "社員アンケート、面談内容、離職防止の取り組みを整理するためにAIを活用できているか。",
    questions: [
      "社員アンケートや面談メモをもとに、職場の課題を整理できている",
      "社員が辞めにくい職場にするための改善案づくりにAIを活用している"
    ]
  },
  {
    id: "hrdata",
    name: "人事データ活用力",
    description: "採用、評価、教育、配置、離職に関するデータを整理し、判断に活かせているか。",
    questions: [
      "採用、評価、育成、離職などの人事データを整理できている",
      "人事データをもとに、採用計画や教育内容の改善に活かせている"
    ]
  },
  {
    id: "privacy",
    name: "個人情報のルール",
    description: "候補者情報、社員情報、評価情報などをAIで扱う際のルールとリスク管理が整っているか。",
    questions: [
      "候補者情報や社員情報をAIに入力する際のルールが明確になっている",
      "AIの回答をそのまま評価・採用判断に使わない運用ができている"
    ]
  },
  {
    id: "strategy",
    name: "人事戦略・経営連携",
    description: "経営方針、必要な人材、現場の課題とAI活用をつなげて進められているか。",
    questions: [
      "会社の方針に合わせて、どんな人材が必要かを整理できている",
      "人事部門としてAI活用を進める担当者や目標がある"
    ]
  }
];

const ratingLabels = {
  1: "まったく当てはまらない",
  2: "あまり当てはまらない",
  3: "どちらともいえない",
  4: "やや当てはまる",
  5: "非常に当てはまる"
};

const typeDefinitions = {
  A: {
    name: "タイプA：人事AI未着手タイプ",
    description: "人事領域でAI活用を始める余地が大きい状態です。まずは採用、育成、労務問い合わせなど、負担が大きい業務から安全に使える型を作ることが重要です。",
    internalChapter: "Chapter1"
  },
  B: {
    name: "タイプB：採用・労務効率化優先タイプ",
    description: "採用対応や労務問い合わせなど、日常的な人事業務に改善余地がある状態です。求人票、候補者対応、社内FAQなどからAI活用を進めると効果が出やすいです。",
    internalChapter: "Chapter1〜Chapter2"
  },
  C: {
    name: "タイプC：社員教育・離職防止強化タイプ",
    description: "採用後の新入社員フォロー、社員教育、離職防止の取り組みに伸びしろがある状態です。教育資料作成や社員の声の整理にAIを活用することで、社員が働き続けやすい環境づくりにつながります。",
    internalChapter: "Chapter2"
  },
  D: {
    name: "タイプD：個人情報のルール要注意タイプ",
    description: "候補者情報、社員情報、評価情報をAIで扱う際のルール整備が不足している可能性があります。活用を進める前に、入力禁止情報や確認フローを明確にする必要があります。",
    internalChapter: "Chapter1〜Chapter2"
  },
  E: {
    name: "タイプE：人事データ活用準備タイプ",
    description: "人事業務のAI活用は進み始めていますが、採用、評価、教育、離職などの人事データを判断に活かす余地があります。データ整理と、何を改善したいかのテーマ設定が次の課題です。",
    internalChapter: "Chapter3"
  },
  F: {
    name: "タイプF：AI人事推進タイプ",
    description: "人事部門のAI活用の土台が整っており、今後は採用、教育、配置、離職防止を横断して、より高度な活用へ進める段階です。",
    internalChapter: "Chapter3"
  }
};

const googleFormConfig = {
  actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc4Xz90dXH70o8OGNrEUw6Jgnzlb68_fvDuu898KA_q6-dTcw/formResponse",
  entries: {
    company: "entry.1477955209",
    name: "entry.435442306",
    department: "entry.1940090297",
    position: "entry.1748700416",
    email: "entry.381459743",
    phone: "entry.1294895389",
    message: "entry.727502749",
    totalScore: "entry.677131340",
    diagnosisType: "entry.837387768",
    hiddenMemo: "entry.349930711",
    categoryScores: "entry.405850628",
    answers: "entry.235368696"
  }
};

let latestResult = null;
let latestContact = null;
let radarChart = null;

const categoryCards = document.getElementById("categoryCards");
const questionsContainer = document.getElementById("questions");
const diagnosisForm = document.getElementById("diagnosisForm");
const formError = document.getElementById("formError");

function renderCategoryCards() {
  categoryCards.innerHTML = categories.map((category, index) => `
    <article class="info-card">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <h3>${category.name}</h3>
      <p>${category.description}</p>
    </article>
  `).join("");
}

function renderQuestions() {
  let questionNumber = 1;

  questionsContainer.innerHTML = categories.map((category) => {
    const questionHtml = category.questions.map((text) => {
      const inputName = `q${questionNumber}`;
      const currentNumber = questionNumber;
      questionNumber += 1;

      return `
        <fieldset class="question-block" data-category="${category.id}">
          <div class="question-meta">
            <span class="question-number">Q${currentNumber}</span>
            <span class="question-category">${category.name}</span>
          </div>
          <legend class="question-text">${text}</legend>
          <div class="rating-row">
            ${Object.entries(ratingLabels).map(([value, label]) => `
              <label>
                <input type="radio" name="${inputName}" value="${value}" required>
                <span>${value}：${label}</span>
              </label>
            `).join("")}
          </div>
        </fieldset>
      `;
    }).join("");

    return questionHtml;
  }).join("");
}

function collectAnswers() {
  const answers = {};
  const missingQuestions = [];
  const totalQuestions = categories.reduce((sum, category) => sum + category.questions.length, 0);

  for (let i = 1; i <= totalQuestions; i += 1) {
    const selected = diagnosisForm.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) {
      missingQuestions.push(`Q${i}`);
    } else {
      answers[`q${i}`] = Number(selected.value);
    }
  }

  return { answers, missingQuestions };
}

function collectContactInfo() {
  const formData = new FormData(diagnosisForm);

  return {
    company: String(formData.get("company") || "").trim(),
    position: String(formData.get("position") || "").trim(),
    name: String(formData.get("name") || "").trim(),
    phone: String(formData.get("phone") || "").trim()
  };
}

function calculateScores(answers) {
  const categoryScores = {};
  let questionIndex = 1;

  categories.forEach((category) => {
    const rawScore = category.questions.reduce((sum) => {
      const answer = answers[`q${questionIndex}`] || 0;
      questionIndex += 1;
      return sum + answer;
    }, 0);

    categoryScores[category.id] = {
      name: category.name,
      score: rawScore,
      max: 10
    };
  });

  const averageOutOfTen = Object.values(categoryScores).reduce((sum, item) => sum + item.score, 0) / categories.length;
  const totalScore = Math.round(averageOutOfTen * 10);

  return { categoryScores, totalScore };
}

function chooseDiagnosisType(totalScore, scores) {
  const low = (id, threshold = 5) => scores[id].score <= threshold;
  const high = (id, threshold = 7) => scores[id].score >= threshold;

  if (totalScore < 30) return typeDefinitions.A;
  if (totalScore >= 80) return typeDefinitions.F;
  if (low("privacy") || low("hrdata")) return typeDefinitions.D;
  if (low("recruiting") || low("operations")) return typeDefinitions.B;
  if (low("development") || low("retention")) return typeDefinitions.C;
  if (totalScore >= 70 && (low("hrdata", 6) || low("strategy", 6))) return typeDefinitions.E;

  return {
    name: "バランス改善タイプ",
    description: "人事AI活用の基礎は見え始めていますが、項目ごとのばらつきがあります。低い項目から順に整備し、採用・社員教育・労務・データ活用をつなげることが有効です。",
    internalChapter: "Chapter1〜Chapter2"
  };
}

function buildIssues(scores) {
  const sortedScores = Object.values(scores).sort((a, b) => a.score - b.score);
  const lowScores = sortedScores.filter((item) => item.score <= 5);
  const issueTargets = lowScores.length ? lowScores : sortedScores.slice(0, 3);

  return issueTargets.map((item) => `${item.name}が${item.score}/10点です。優先的に改善すると、AI活用の定着につながります。`);
}

function calculateImpactEstimate(result) {
  const privacyScore = result.categoryScores.privacy.score;
  const hrdataScore = result.categoryScores.hrdata.score;
  const recruitingScore = result.categoryScores.recruiting.score;
  const operationsScore = result.categoryScores.operations.score;
  const riskAverage = (privacyScore + hrdataScore) / 2;
  const workloadAverage = (recruitingScore + operationsScore) / 2;
  const inefficiencyCost = Math.max(30, Math.round((10 - workloadAverage) * 18));
  const shadowRiskCost = Math.max(10, Math.round((10 - riskAverage) * 7));

  return {
    inefficiencyCost,
    shadowRiskCost
  };
}

function renderResults(result) {
  document.getElementById("results").hidden = false;
  document.getElementById("totalScore").textContent = result.totalScore;
  document.getElementById("diagnosisType").textContent = result.type.name;
  document.getElementById("typeDescription").textContent = result.type.description;

  document.getElementById("currentIssues").innerHTML = result.issues.map((issue) => `<li>${issue}</li>`).join("");

  document.getElementById("scoreCards").innerHTML = Object.values(result.categoryScores).map((item) => `
    <article class="score-card">
      <div class="score-top">
        <span>${item.name}</span>
        <strong>${item.score}/10</strong>
      </div>
      <div class="score-bar" aria-hidden="true"><span style="width: ${item.score * 10}%"></span></div>
    </article>
  `).join("");

  renderRadarChart(result.categoryScores);
  const impact = calculateImpactEstimate(result);
  document.getElementById("lossCost").textContent = `約${impact.inefficiencyCost}万円`;
  document.getElementById("shadowRisk").textContent = `約${impact.shadowRiskCost}万円`;
  document.getElementById("results").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderRadarChart(categoryScores) {
  const canvas = document.getElementById("radarChart");

  if (typeof Chart === "undefined") {
    drawFallbackRadarChart(canvas, categoryScores);
    return;
  }

  if (radarChart) {
    radarChart.destroy();
  }

  radarChart = new Chart(canvas, {
    type: "radar",
    data: {
      labels: Object.values(categoryScores).map((item) => item.name),
      datasets: [{
        label: "AI活用レベル",
        data: Object.values(categoryScores).map((item) => item.score),
        fill: true,
        backgroundColor: "rgba(23, 105, 224, 0.18)",
        borderColor: "#1769e0",
        pointBackgroundColor: "#1aa6a6",
        pointBorderColor: "#ffffff",
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: "#1769e0"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 10,
          ticks: {
            stepSize: 2
          },
          pointLabels: {
            color: "#172033",
            font: {
              size: 12,
              weight: "700"
            }
          },
          grid: {
            color: "#dbe5f2"
          },
          angleLines: {
            color: "#dbe5f2"
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

// CDNが使えないローカル環境でも診断結果が見えるように、canvasで簡易レーダーを描画します。
function drawFallbackRadarChart(canvas, categoryScores) {
  const ctx = canvas.getContext("2d");
  const scores = Object.values(categoryScores);
  const size = Math.min(canvas.width, canvas.height);
  const center = size / 2;
  const radius = size * 0.34;
  const labelRadius = size * 0.43;
  const angleStep = (Math.PI * 2) / scores.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate((canvas.width - size) / 2, (canvas.height - size) / 2);
  ctx.font = "700 12px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let level = 1; level <= 5; level += 1) {
    const levelRadius = radius * (level / 5);
    ctx.beginPath();
    scores.forEach((_, index) => {
      const angle = -Math.PI / 2 + angleStep * index;
      const x = center + Math.cos(angle) * levelRadius;
      const y = center + Math.sin(angle) * levelRadius;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.strokeStyle = "#dbe5f2";
    ctx.stroke();
  }

  scores.forEach((item, index) => {
    const angle = -Math.PI / 2 + angleStep * index;
    const lineX = center + Math.cos(angle) * radius;
    const lineY = center + Math.sin(angle) * radius;
    const labelX = center + Math.cos(angle) * labelRadius;
    const labelY = center + Math.sin(angle) * labelRadius;

    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(lineX, lineY);
    ctx.strokeStyle = "#dbe5f2";
    ctx.stroke();
    ctx.fillStyle = "#172033";
    ctx.fillText(item.name, labelX, labelY);
  });

  ctx.beginPath();
  scores.forEach((item, index) => {
    const angle = -Math.PI / 2 + angleStep * index;
    const pointRadius = radius * (item.score / 10);
    const x = center + Math.cos(angle) * pointRadius;
    const y = center + Math.sin(angle) * pointRadius;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(23, 105, 224, 0.18)";
  ctx.strokeStyle = "#1769e0";
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function saveLead(payload) {
  const previousLeads = JSON.parse(localStorage.getItem("aiDiagnosisLeads") || "[]");
  const nextLeads = [...previousLeads, payload];
  localStorage.setItem("aiDiagnosisLeads", JSON.stringify(nextLeads));
  console.log("AI診断LP 送信内容", payload);
}

function appendHiddenField(form, name, value) {
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

function formatCategoryScores(result) {
  if (!result) return "未診断";

  return Object.values(result.categoryScores)
    .map((item) => `${item.name}: ${item.score}/10`)
    .join("\n");
}

function formatAnswers(result) {
  if (!result) return "未診断";

  let questionNumber = 1;
  return categories.flatMap((category) => category.questions.map((question) => {
    const answer = result.answers[`q${questionNumber}`];
    const line = `Q${questionNumber}. ${question}：${answer}（${ratingLabels[answer]}）`;
    questionNumber += 1;
    return line;
  })).join("\n");
}

function formatInternalRecommendation(result) {
  if (!result) return "未診断";

  return [
    `必要Chapter: ${result.type.internalChapter}`,
    `診断タイプ: ${result.type.name}`,
    `総合スコア: ${result.totalScore}/100`,
    "低スコア項目:",
    ...result.issues
  ].join("\n");
}

function submitToGoogleForm(payload) {
  const iframeName = "googleFormSubmitFrame";
  let iframe = document.querySelector(`iframe[name="${iframeName}"]`);

  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.hidden = true;
    document.body.appendChild(iframe);
  }

  const form = document.createElement("form");
  form.action = googleFormConfig.actionUrl;
  form.method = "POST";
  form.target = iframeName;
  form.style.display = "none";

  const entries = googleFormConfig.entries;
  const result = payload.diagnosisResult;
  const contact = payload.contact;

  appendHiddenField(form, entries.company, contact.company || "未入力");
  appendHiddenField(form, entries.name, contact.name || "未入力");
  appendHiddenField(form, entries.department, contact.department || "未入力");
  appendHiddenField(form, entries.position, contact.position || "未入力");
  appendHiddenField(form, entries.email, contact.email || "no-reply@example.com");
  appendHiddenField(form, entries.phone, contact.phone || "未入力");
  appendHiddenField(form, entries.message, contact.message || "診断結果送信");
  appendHiddenField(form, entries.totalScore, result ? `${result.totalScore}/100` : "未診断");
  appendHiddenField(form, entries.diagnosisType, result ? result.type.name : "未診断");
  appendHiddenField(form, entries.hiddenMemo, formatInternalRecommendation(result));
  appendHiddenField(form, entries.categoryScores, formatCategoryScores(result));
  appendHiddenField(form, entries.answers, formatAnswers(result));

  document.body.appendChild(form);
  form.submit();
  form.remove();
}

function buildResultPayload() {
  return {
    contact: {
      company: latestContact.company,
      name: latestContact.name,
      department: "未入力",
      position: latestContact.position,
      email: "no-reply@example.com",
      phone: latestContact.phone,
      message: "診断結果を見るボタン押下時に送信"
    },
    diagnosisResult: latestResult,
    submittedAt: new Date().toISOString(),
    submissionType: "diagnosis_result"
  };
}

diagnosisForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formError.textContent = "";

  const { answers, missingQuestions } = collectAnswers();

  if (missingQuestions.length > 0) {
    formError.textContent = `${missingQuestions.join("、")} に回答してください。`;
    return;
  }

  latestContact = collectContactInfo();
  const { categoryScores, totalScore } = calculateScores(answers);
  const type = chooseDiagnosisType(totalScore, categoryScores);
  const issues = buildIssues(categoryScores);

  latestResult = {
    createdAt: new Date().toISOString(),
    answers,
    categoryScores,
    totalScore,
    type,
    issues
  };

  const payload = buildResultPayload();
  saveLead(payload);
  submitToGoogleForm(payload);
  renderResults(latestResult);
});

renderCategoryCards();
renderQuestions();
