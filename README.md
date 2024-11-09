### GitHub Repository: EventSimulator - Licensing Information

#### Description

The EventSimulator library is a robust JavaScript toolkit for simulating user events on web elements. It offers a comprehensive solution for developers to programmatically trigger events such as clicks, keyboard inputs, and focus changes, which are crucial for testing, automating user interactions, and simulating user behavior in web applications.

**Features:**

- **XPath and CSS Selectors Support:** Easily target elements using XPath or CSS selectors.
- **Event Creation and Dispatch:** Generate and dispatch a variety of events including mouse, keyboard, and focus events.
- **Asynchronous Action Execution:** Mimic real user interactions by executing a sequence of actions with delays.
- **Extensive Event Types:** Support for a wide range of event types such as click, change, input, focus, blur, keydown, keyup, and more.

**Usage:**

To simulate a click event using the EventSimulator library, include it in your project and use the following code:

```javascript
// Assuming the library is included in your project
const simulator = new EventSimulator('#myButton');
simulator.click();
```

**Installation:**

For non-commercial use, you can include EventSimulator directly in your HTML:

```html
<script src="path/to/eventsimulator.js"></script>
```

For commercial use, a commercial license is required. Please contact us to purchase a license.

**Licensing:**

- **Non-Commercial Use:** Free of charge.
- **Commercial Use:** A commercial license is required. Please visit our website or contact our sales team for terms, conditions, and pricing.

**Contribution:**

Contributions are welcome, but by contributing, you agree to the terms and conditions set forth by the EventSimulator team.

**License Agreement:**

By using EventSimulator, you agree to the terms of the license applicable to your use case. The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

Please visit our website for more information on how to obtain a commercial license and to review the full terms and conditions of the license agreement.

---

#### 描述

EventSimulator 库是一个强大的JavaScript工具包，用于模拟网页元素上的用户事件。它为开发者提供了一个全面的解决方案，以编程方式触发点击、键盘输入和焦点变化等事件，这对于测试、自动化用户交互和模拟Web应用程序中的用户行为至关重要。

**特性：**

- **支持XPath和CSS选择器：** 轻松使用XPath或CSS选择器定位元素。
- **事件创建和分派：** 生成并分派包括鼠标、键盘和焦点事件在内的各种事件。
- **异步执行动作：** 通过执行一系列带有延迟的动作来模拟真实用户交互。
- **广泛的事件类型支持：** 支持包括点击、更改、输入、焦点、失焦、按键下降、按键上升等广泛的事件类型。

**使用方式：**

要在您的项目中使用EventSimulator库模拟点击事件，只需将其包含在您的项目中，并使用以下代码：

```javascript
// 假设库已包含在您的项目中
const simulator = new EventSimulator('#myButton');
simulator.click();
```

**安装：**

对于非商业用途，您可以直接在HTML中包含EventSimulator：

```html
<script src="path/to/eventsimulator.js"></script>
```

对于商业用途，需要购买商业许可证。请联系我们购买许可证。

**许可：**

- **非商业用途：** 免费。
- **商业用途：** 需要商业许可证。请访问我们的网站或联系我们的销售团队了解条款、条件和定价。

**贡献：**

我们欢迎贡献，但通过贡献，您同意EventSimulator团队制定的条款和条件。

**许可协议：**

使用EventSimulator即表示您同意适用于您使用情况的许可条款。该软件按“原样”提供，不提供任何形式的明示或暗示担保，包括但不限于适销性、特定用途适用性和非侵权性的担保。在任何情况下，即使作者或版权持有者也不会对任何索赔、损害或其他责任负责，无论是合同行为、侵权行为或其他行为，因软件或软件的使用或其他交易而引起的。

请访问我们的网站，了解更多如何获得商业许可证的信息，并查看许可协议的完整条款和条件。













### EventSimulator 中英文双语教学

EventSimulator 是一个JavaScript库，用于模拟网页元素上的用户事件。以下是EventSimulator的中英文双语使用教程。

#### 1. 包含EventSimulator库

首先，在你的项目中包含EventSimulator库。你可以通过npm安装或者直接在HTML中包含它：

```html
<!-- 通过npm安装 -->
npm install eventsimulator

<!-- 或者直接在HTML中包含 -->
<script src="path/to/eventsimulator.js"></script>
```

#### 2. 模拟点击事件

以下是如何使用EventSimulator库模拟点击事件的示例：

```javascript
// 假设库已包含在您的项目中
const simulator = new EventSimulator('#myButton');
simulator.click();
```

**中文：**
首先，确保你的项目中已经包含了EventSimulator库。以下是如何模拟点击事件的示例代码：

```javascript
// 确保库已包含在你的项目中
const simulator = new EventSimulator('#myButton');
simulator.click();
```

**English:**
Include the EventSimulator library in your project first. Here's how to simulate a click event using the EventSimulator library:

```javascript
// Make sure the library is included in your project
const simulator = new EventSimulator('#myButton');
simulator.click();
```

#### 3. 模拟键盘事件

模拟键盘事件，例如按键：

```javascript
const simulator = new EventSimulator('#myInput');
simulator.keydown({ key: 'Enter' });
```

**中文：**
模拟键盘事件，例如按下回车键：

```javascript
const simulator = new EventSimulator('#myInput');
simulator.keydown({ key: 'Enter' });
```

**English:**
Simulate keyboard events, such as pressing the Enter key:

```javascript
const simulator = new EventSimulator('#myInput');
simulator.keydown({ key: 'Enter' });
```

#### 4. 模拟鼠标移动和滚轮事件

模拟鼠标移动到特定元素上，然后触发滚轮事件：

```javascript
const simulator = new EventSimulator('#myElement');
simulator.mouseover();
simulator.wheel({ deltaY: 100 }); // 向上滚动100像素
```

**中文：**
模拟鼠标移动到特定元素上，然后触发滚轮事件，向上滚动100像素：

```javascript
const simulator = new EventSimulator('#myElement');
simulator.mouseover();
simulator.wheel({ deltaY: 100 }); // 向上滚动100像素
```

**English:**
Simulate mouse movement over a specific element, then trigger a wheel event to scroll up by 100 pixels:

```javascript
const simulator = new EventSimulator('#myElement');
simulator.mouseover();
simulator.wheel({ deltaY: 100 }); // Scroll up by 100 pixels
```

#### 5. 异步执行动作

使用 `executeActionsWithDelay` 函数异步执行一系列动作：

```javascript
async function executeActionsWithDelay(actions) {
    for (const action of actions) {
        await new Promise((resolve) => {
            setTimeout(() => {
                const simulator = new EventSimulator(action.selector);
                simulator[action.actionType]();
                resolve();
            }, action.delay);
        });
    }
}

// 定义动作数组
const actions = [
    { delay: 1000, selector: '#button1', actionType: 'click' },
    { delay: 2000, selector: '#button2', actionType: 'click' }
];

// 执行所有动作
executeActionsWithDelay(actions).catch((error) => {
    console.error('An error occurred:', error);
});
```

**中文：**
使用 `executeActionsWithDelay` 函数异步执行一系列动作，例如先点击按钮1，等待1秒后再点击按钮2：

```javascript
async function executeActionsWithDelay(actions) {
    for (const action of actions) {
        await new Promise((resolve) => {
            setTimeout(() => {
                const simulator = new EventSimulator(action.selector);
                simulator[action.actionType]();
                resolve();
            }, action.delay);
        });
    }
}

// 定义动作数组
const actions = [
    { delay: 1000, selector: '#button1', actionType: 'click' },
    { delay: 2000, selector: '#button2', actionType: 'click' }
];

// 执行所有动作
executeActionsWithDelay(actions).catch((error) => {
    console.error('An error occurred:', error);
});
```

**English:**
Use the `executeActionsWithDelay` function to asynchronously execute a series of actions, such as clicking button 1 and then waiting for 1 second before clicking button 2:

```javascript
async function executeActionsWithDelay(actions) {
    for (const action of actions) {
        await new Promise((resolve) => {
            setTimeout(() => {
                const simulator = new EventSimulator(action.selector);
                simulator[action.actionType]();
                resolve();
            }, action.delay);
        });
    }
}

// Define an array of actions
const actions = [
    { delay: 1000, selector: '#button1', actionType: 'click' },
    { delay: 2000, selector: '#button2', actionType: 'click' }
];

// Execute all actions
executeActionsWithDelay(actions).catch((error) => {
    console.error('An error occurred:', error);
});
```

通过这些步骤和示例，你应该能够开始使用EventSimulator库来模拟用户事件了。如果你有任何疑问或需要进一步的帮助，请随时提问。

