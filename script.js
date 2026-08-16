const steps = [
  "判断主题是否符合 AI 实战定位",
  "拆解 3-5 个可写角度",
  "等待人工选择一个角度",
  "搜集公开资讯与案例",
  "整理素材库、生成大纲与初稿",
  "输出到飞书文档",
];

const angles = [
  {
    title: "普通人如何搭建 AI 自动化工作流",
    reason: "面向想提升效率但不知道从哪开始的读者，适合写成实操教程。",
    direction: "从任务拆解、工具组合、触发器设计和避坑清单切入。",
  },
  {
    title: "AI Agent 真正落地前要先做哪些判断",
    reason: "把热闹概念转成可执行框架，适合 AI 实战分享定位。",
    direction: "围绕输入、流程、权限、人工兜底和验收标准展开。",
  },
  {
    title: "为什么评论区问题是最好的选题来源",
    reason: "贴合账号经验方法论，也能解释如何判断一个话题是否值得写。",
    direction: "从评论数量、评论质量、痛点密度和跨平台重复信号展开。",
  },
  {
    title: "用飞书把内容生产 Agent 变成工作流",
    reason: "有明确工具场景，能展示从选题到文档交付的完整闭环。",
    direction: "展示飞书消息、文档输出、权限边界和人工确认节点。",
  },
];

const capabilities = [
  "宽泛主题理解",
  "AI 实战方向校准",
  "热点与评论区问题判断",
  "细分角度拆解",
  "公开资讯搜集",
  "素材库提炼",
  "文章大纲生成",
  "公众号初稿生成",
  "飞书文档交付",
];

const guardrails = [
  "只使用公开、可访问、可引用的信息源",
  "默认优先最近 7 天资讯，必要时说明后放宽到 30 天",
  "关键事实、数据、案例和引用必须带来源",
  "资料不足时暂停并提示补充，不编造内容",
  "用户未选择角度前，不进入深度资料搜集和初稿生成",
  "不处理付费订阅、登录验证或封闭内容源",
  "不负责配图、封面图、公众号发布和最终事实审核",
];

const safety = [
  "展示页不连接飞书、Hermes 或任何真实 API",
  "不包含 App ID、Secret、Token、Webhook 或本地路径",
  "访客输入只触发前端模拟结果，不会发送到服务器处理",
  "样例内容为脱敏演示，不读取你的真实文档或聊天记录",
];

let selectedAngle = 1;

function renderProgress(activeIndex = -1) {
  const progressList = document.getElementById("progressList");
  progressList.innerHTML = steps
    .map(
      (step, index) => `
        <div class="progress-item ${index <= activeIndex ? "is-active" : ""}">
          <span>${index + 1}</span>
          <p>${step}</p>
        </div>
      `,
    )
    .join("");
}

function renderAngles() {
  const angleGrid = document.getElementById("angleGrid");
  angleGrid.innerHTML = angles
    .map(
      (angle, index) => `
        <button class="angle-card ${selectedAngle === index ? "selected" : ""}" data-angle="${index}" type="button">
          <span>角度 ${index + 1}</span>
          <h3>${angle.title}</h3>
          <p>${angle.reason}</p>
          <small>${angle.direction}</small>
        </button>
      `,
    )
    .join("");

  angleGrid.querySelectorAll(".angle-card").forEach((button) => {
    button.addEventListener("click", () => {
      selectedAngle = Number(button.dataset.angle);
      document.getElementById("docTitle").textContent = angles[selectedAngle].title;
      renderAngles();
    });
  });
}

function renderFlow() {
  const flowGrid = document.getElementById("flowGrid");
  flowGrid.innerHTML = steps
    .map(
      (step, index) => `
        <div class="flow-node">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <p>${step}</p>
        </div>
      `,
    )
    .join("");
}

function renderTags() {
  document.getElementById("capabilityGrid").innerHTML = capabilities
    .map((item) => `<span>${item}</span>`)
    .join("");

  document.getElementById("guardrailList").innerHTML = guardrails
    .map((item) => `<li>${item}</li>`)
    .join("");

  document.getElementById("safetyGrid").innerHTML = safety
    .map(
      (item) => `
        <div class="safety-item">
          <span>✓</span>
          <p>${item}</p>
        </div>
      `,
    )
    .join("");
}

function runDemo() {
  const statusText = document.getElementById("statusText");
  steps.forEach((step, index) => {
    window.setTimeout(() => {
      statusText.textContent = step;
      renderProgress(index);
    }, index * 620);
  });
}

document.getElementById("runButton").addEventListener("click", runDemo);
renderProgress();
renderAngles();
renderFlow();
renderTags();
