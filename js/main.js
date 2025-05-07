// 音效文件列表
var audioFiles = ["1.mp3", "djh.mp3", "hh.mp3", "j.mp3", "lq.mp3", "ma.mp3", "n.mp3", "rp.mp3", "t.mp3", "ws.mp3", "唱.mp3", "喜欢.mp3"];
var currentAudioIndex = 0; // 当前音效文件的索引
// 图片数组
var images = ["img/1.png","img/2.png","img/3.png","img/4.png","img/5.png","img/6.png","img/7.png","img/8.png"];
// 自动点击相关变量
var autoRunData = false;
var autoRunSpeed = 1000;
// 当前图片索引
var currentImageIndex = 0;

// 创建全局的 Audio 实例并设置默认音效文件
var audio = new Audio("audio/default/" + audioFiles[currentAudioIndex]);


// 设置木鱼音效按钮的点击事件
$("#change-sound-btn").click(function() {
    currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length; // 循环切换音效文件
    $(".text .text_1").text("当前音效：" + audioFiles[currentAudioIndex]); // 显示当前音效
    audio.src = "audio/default/" + audioFiles[currentAudioIndex]; // 更新音效文件路径
});

// 自动点击按钮的点击事件
$("#auto-click-btn").click(function() {
    autoRunData = !autoRunData; // 切换自动点击状态
    if (autoRunData) {
        $(".text .text_1").text("自动点击已开启");
        autoRun(); // 开始自动点击
    } else {
        $(".text .text_1").text("自动点击已关闭");
    }
});

// 点击事件绑定
$(".woodfish .click").click(function (e) {
    run();
});

// 按钮点击事件处理
$(".list").click(function (e) {
    var data = $(this).attr("data");
    if (data == "reset") {
        Merit = 0;
        $(".text .text_1").text("当前功德：" + Merit);
    } else if (data == "changeAudio") {
        changeAudio();
    } else if (data == "autoClick") {
        auto_run_data = !auto_run_data;
        if (auto_run_data) auto_run();
    }
});
// 执行的核心功能
function run() {
    // 切换图片
    currentImageIndex = (currentImageIndex + 1) % images.length; // 每次递增，循环播放
    $(".woodfish .click img").attr("src", images[currentImageIndex]); // 更新图片路径
    
    audio_play($(".woodfish").attr("data"));
    Data_control("click");
    animation();
    animation_text();
}

// 播放音频（使用全局 audio 实例）
function audio_play() {
    audio.currentTime = 0; // 将播放位置重置为开始
    audio.play();
}

// 木鱼图片动画
function animation() {
    $(".woodfish .click img").css("width", "150px");
    setTimeout(() => {
        $(".woodfish .click img").css("width", "100px");
    }, 100);
}

// 显示功德+1的文本动画
function animation_text() {
    var randomNum_1 = randomNum(0, 100000);
    $(".woodfish").append("<div id=\"text_tips_" + randomNum_1 + "\" class=\"text_tips\">功德+1</div>");
    setTimeout(() => {
        $(".woodfish .text_tips").css("margin-bottom", "300px");
    }, 5);
    setTimeout(() => {
        $("#text_tips_" + randomNum_1).css("opacity", "0");
    }, 15);
    setTimeout(() => {
        $("#text_tips_" + randomNum_1).remove();
    }, 500);
}

// 自动点击函数
function autoRun() {
    if (autoRunData) {
        run(); // 执行点击
        setTimeout(autoRun, autoRunSpeed); // 每隔 autoRunSpeed 毫秒执行一次
    }
}

// 随机数生成
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

// 读取和更新功德数（使用cookie保存）
if ($.cookie("Merit") == undefined) $.cookie("Merit", "0", { expires: 30 });
var Merit = 0;
Merit = $.cookie("Merit");
Data_control("null");

function Data_control(Merit_data) {
    if (Merit_data == "click") {
        Merit++;
        $.cookie("Merit", Merit, { expires: 30 });
        $(".text .text_1").text("当前功德：" + Merit);
    } else {
        $(".text .text_1").text("当前功德：" + Merit);
    }
}
