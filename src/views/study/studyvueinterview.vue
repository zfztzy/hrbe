<template>
  <div>
    <Studyrow :studyInfo="studyInfo"></Studyrow>
  </div>
</template>

<script>
import Studyrow from '../../components/row/Studyrow.vue'
import * as request from '../../network/request'
// @ is an alias to /src



export default {
  components: {Studyrow},
  data(){
      return{
          studyInfo:{
            imsgp:`<div>
    <h2 id="one">VUE面试题</h2>
    <ol>
    <li>v-show 与 v-if 区别</li>
    <li>动态绑定class的方法</li>
    <li>计算属性和 watch 的区别</li>
    <li>怎样理解单向数据流</li>
    <li>keep-alive</li>
    <li>自定义组件的语法糖 v-model 是怎样实现的</li>
    <li>生命周期</li><article class="article fmt article-content ">
        <h2 id="two">VUE面试题</h2>
        <ol>
        <li>v-show 与 v-if 区别</li>
        <li>动态绑定class的方法</li>
        <li>计算属性和 watch 的区别</li>
        <li>怎样理解单向数据流</li>
        <li>keep-alive</li>
        <li>自定义组件的语法糖 v-model 是怎样实现的</li>
        <li>生命周期</li>
        <li>组件通信</li>
        <li>路由跳转</li>
        <li>vue-router 有哪几种导航钩子</li>
        <li>Vue.js 2.x 双向绑定原理</li>
        <li>什么是 MVVM，与 MVC 有什么区别</li>
        <li>vuex</li>
        <li>this.$nextTick()</li>
        <li>vue的原理</li>
        <li>理解Vue中的Render渲染函数</li>
        <li>slot插槽</li>
        </ol>
        <h3 id="three">v-show 与 v-if 区别</h3>
        <ol>
        <li>v-hsow和v-if的区别：<br>v-show是css切换，v-if是完整的销毁和重新创建。</li>
        <li>使用<br>频繁切换时用v-show，运行时较少改变时用v-if</li>
        <li>v-if=‘false’ v-if是条件渲染，当false的时候不会渲染</li>
        </ol>
        <h3 id="four">绑定 class 的数组用法</h3>
        <ul>
        <li>对象方法 <code>v-bind:class="{'orange': isRipe, 'green': isNotRipe}"</code>
        </li>
        <li>数组方法<code>v-bind:class="[class1, class2]"</code>
        </li>
        <li>行内 <code>v-bind:style="{color: color, fontSize: fontSize+'px' }"</code>
        </li>
        </ul>
        <h3 id="five">计算属性和 watch 的区别</h3>
        <p>计算属性是自动监听依赖值的变化，从而动态返回内容，监听是一个过程，在监听的值变化时，可以触发一个回调，并做一些事情。<br>所以区别来源于用法，只是需要动态值，那就用计算属性；需要知道值的改变后执行业务逻辑，才用 watch，用反或混用虽然可行，但都是不正确的用法。<br><strong>说出一下区别会加分</strong><br>computed 是一个对象时，它有哪些选项？<br>computed 和 methods 有什么区别？<br>computed 是否能依赖其它组件的数据？<br>watch 是一个对象时，它有哪些选项？</p>
        <ol>
        <li>有get和set两个选项</li>
        <li>methods是一个方法，它可以接受参数，而computed不能，computed是可以缓存的，methods不会。</li>
        <li>computed可以依赖其他computed，甚至是其他组件的data</li>
        <li>watch 配置 <br>handler<br>deep 是否深度<br>immeditate 是否立即执行</li>
        </ol>
        <p><strong>总结</strong></p>
        <p>当有一些数据需要随着另外一些数据变化时，建议使用computed。<br>当有一个通用的响应数据变化的时候，要执行一些业务逻辑或异步操作的时候建议使用watcher</p>
        <h3 id="six">事件修饰符</h3>
        <ul>
        <li>绑定一个原生的click事件， 加native，</li>
        <li>其他事件修饰符</li>
        </ul>
        <p>stop prevent  self</p>
        <ul><li>组合键</li></ul>
        <p>click.ctrl.exact 只有ctrl被按下的时候才触发</p>
        <h3 id="seven">组件中 data 为什么是函数</h3>
        <blockquote>为什么组件中的 data 必须是一个函数，然后 return 一个对象，而 new Vue 实例里，data 可以直接是一个对象？</blockquote>
        <p>因为组件是用来复用的，JS 里对象是引用关系，这样作用域没有隔离，而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。</p>
        <h3 id="eight">keep-alive</h3>
        <p><a href="https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%9C%A8%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-keep-alive">https://cn.vuejs.org/v2/guide...</a></p>
        <h3 id="night">自定义组件的语法糖 v-model 是怎样实现的</h3>
        <p><a href="https://www.cnblogs.com/attacking-cabbage/p/10260393.html">https://www.cnblogs.com/attac...</a><br>  根据官方文档介绍，v-model本质上就是语法糖，即利用v-model绑定数据后，其实就是既绑定了数据，又添加了一个input事件监听，如下：</p>
        <p><span class="img-wrap"><img class="lazy" data-src="/img/bVbqkRp" alt="clipboard.png" title="clipboard.png"></span></p>
        <h3 id="ten">怎样理解单向数据流</h3>
        <p>这个概念出现在组件通信。父组件是通过 prop 把数据传递到子组件的，但是这个 prop 只能由父组件修改，子组件不能修改，否则会报错。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。<br>一般来说，对于子组件想要更改父组件状态的场景，可以有两种方案：<br>在子组件的 data 中拷贝一份 prop，data 是可以修改的，但 prop 不能：</p>
        <div class="widget-codetool" style="display:none;">
                <div class="widget-codetool--inner">
                <button type="button" class="btn btn-dark far fa-copy rounded-0 sflex-center copyCode" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
          props: {
            value: String
          },
          data () {
            return {
              currentValue: this.value
            }
          }
        }" title="" data-original-title="复制"></button>
                </div>
                </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
          <span class="hljs-attr">props</span>: {
            <span class="hljs-attr">value</span>: <span class="hljs-built_in">String</span>
          },
          data () {
            <span class="hljs-keyword">return</span> {
              <span class="hljs-attr">currentValue</span>: <span class="hljs-built_in">this</span>.value
            }
          }
        }</code></pre>
        <p>如果是对 prop 值的转换，可以使用计算属性：</p>
        <div class="widget-codetool" style="display:none;">
                <div class="widget-codetool--inner">
                <button type="button" class="btn btn-dark far fa-copy rounded-0 sflex-center copyCode" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
          props: ['size'],
          computed: {
            normalizedSize: function () {
              return this.size.trim().toLowerCase();
            }
          }
        }" title="" data-original-title="复制"></button>
                </div>
                </div><pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
          <span class="hljs-attribute">props</span>: [<span class="hljs-string">'size'</span>],
          computed: {
            normalizedSize: function () {
              return this.size.<span class="hljs-built_in">trim</span>().<span class="hljs-built_in">toLowerCase</span>();
            }
          }
        }</code></pre>
        <h3 id="oneone">生命周期</h3>
        <ul><li>创建前后 beforeCreate/created</li></ul>
        <p>在beforeCreate 阶段，vue实例的挂载元素el和数据对象data都为undefined，还未初始化。在created阶段，vue实例的数据对象有了，el还没有。</p>
        <ul><li>载入前后 beforeMount/mounted</li></ul>
        <p>在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前未虚拟的DOM节点，data尚未替换。 <br>在mounted阶段，vue实例挂载完成，data成功渲染。</p>
        <ul><li>更新前后 beforeUpdate/updated</li></ul>
        <p>当data变化时，会触发beforeUpdate和updated方法。这两个不常用，不推荐使用。</p>
        <ul><li>销毁前后beforeDestory/destoryed</li></ul>
        <p>beforeDestory是在vue实例销毁前触发，一般在这里要通过removeEventListener解除手动绑定的事件。实例销毁后，触发的destroyed。</p>
        <h3 id="onetwo">组件间的通信</h3>
        <ol>
        <li>父子 props/event  <span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>p</mi><mi>a</mi><mi>r</mi><mi>e</mi><mi>n</mi><mi>t</mi><mi mathvariant="normal">/</mi></mrow><annotation encoding="application/x-tex">parent/</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em;"></span><span class="mord mathnormal">p</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right: 0.02778em;">r</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mord mathnormal">t</span><span class="mord">/</span></span></span></span></span>children    ref  provide/inject</li>
        <li>兄弟  bus vuex</li>
        <li>跨级 bus  vuex provide.inject</li>
        </ol>
        <h3 id="onethree">路由的跳转方式</h3>
        <p>一般有两种</p>
        <ol>
        <li>
        <code>&lt;router-link to='home'&gt; router-link</code>标签会渲染为<code>&lt;a&gt;</code>标签，咋填template中的跳转都是这种；</li>
        <li>另一种是编程是导航  也就是通过js跳转  比如  <code>router.push('/home')</code>
        </li>
        </ol>
        <h3 id="onefour">Vue.js 2.x 双向绑定原理</h3>
        <p>这个问题几乎是面试必问的，回答也是有深有浅。基本上要知道核心的 API 是通过 <code>Object.defineProperty()</code> 来劫持各个属性的<code> setter / getter</code>，在数据变动时发布消息给订阅者，触发相应的监听回调，这也是为什么 Vue.js 2.x 不支持 IE8 的原因（IE 8 不支持此 API，且无法通过 polyfill 实现）。<br><a href="https://cn.vuejs.org/v2/guide/reactivity.html">https://cn.vuejs.org/v2/guide...</a></p>
        <h3 id="onefive">什么是 MVVM，与 MVC 有什么区别</h3>
        <p><a href="http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html">http://www.ruanyifeng.com/blo...</a></p>
        <h3 id="onesix">nextTick()</h3>
        <p>在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后，立即使用这个回调函数，获取更新后的 DOM。</p>
        <div class="widget-codetool" style="display:none;">
                <div class="widget-codetool--inner">
                <button type="button" class="btn btn-dark far fa-copy rounded-0 sflex-center copyCode" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 修改数据
        vm.msg = 'Hello'
        // DOM 还未更新
        Vue.nextTick(function () {
          // DOM 更新
        })" title="" data-original-title="复制"></button>
                </div>
                </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span> 修改数据
        vm.msg = <span class="hljs-string">'Hello'</span>
        <span class="hljs-regexp">//</span> DOM 还未更新
        Vue.nextTick(<span class="hljs-keyword">function</span> () {
          <span class="hljs-regexp">//</span> DOM 更新
        })</code></pre>
        <h2 id="oneseven">vue的原理</h2>
        <p><a href="https://segmentfault.com/a/1190000016434836">https://segmentfault.com/a/11...</a></p>
        <p><span class="img-wrap"><img class="lazy" data-src="/img/remote/1460000018707445?w=1200&amp;h=750" alt="" title=""></span><br>Vue的模式是m-v-vm模式，即（<code>model-view-modelView</code>），通过modelView作为中间层（即vm的实例），进行双向数据的绑定与变化。</p>
        <ol>
        <li>通过建立虚拟dom树<code>document.createDocumentFragment()</code>,方法创建虚拟dom树。</li>
        <li>一旦被监测的数据改变，会通过<code>Object.defineProperty</code>定义的数据拦截，截取到数据的变化。</li>
        <li>截取到的数据变化，从而通过订阅——发布者模式，触发<code>Watcher</code>（观察者）,从而改变虚拟dom的中的具体数据。</li>
        <li>最后，通过更新虚拟dom的元素值，从而改变最后渲染dom树的值，完成双向绑定</li>
        </ol>
        <p>双向绑定的实现</p>
        <div class="widget-codetool" style="display:none;">
                <div class="widget-codetool--inner">
                <button type="button" class="btn btn-dark far fa-copy rounded-0 sflex-center copyCode" data-toggle="tooltip" data-placement="top" data-clipboard-text="object.defineProperty 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
        语法：Object.defineProperty(obj, prop, descriptor)
        
        var obj = {};
        Object.defineProperty(obj,'hello',{
          get:function(){
            //我们在这里拦截到了数据
            console.log(&quot;get方法被调用&quot;);
          },
          set:function(newValue){
            //改变数据的值，拦截下来额
            console.log(&quot;set方法被调用&quot;);
          }
        });
        obj.hello//输出为“get方法被调用”，输出了值。
        obj.hello = 'new Hello';//输出为set方法被调用，修改了新值" title="" data-original-title="复制"></button>
                </div>
                </div><pre class="javascript hljs"><code class="javascript">object.defineProperty 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
        语法：<span class="hljs-built_in">Object</span>.defineProperty(obj, prop, descriptor)
        
        <span class="hljs-keyword">var</span> obj = {};
        <span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">'hello'</span>,{
          <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-comment">//我们在这里拦截到了数据</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"get方法被调用"</span>);
          },
          <span class="hljs-attr">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>)</span>{
            <span class="hljs-comment">//改变数据的值，拦截下来额</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"set方法被调用"</span>);
          }
        });
        obj.hello<span class="hljs-comment">//输出为“get方法被调用”，输出了值。</span>
        obj.hello = <span class="hljs-string">'new Hello'</span>;<span class="hljs-comment">//输出为set方法被调用，修改了新值</span></code></pre>
        <p>我们可以做到数据的双向绑定：</p>
        <div class="widget-codetool" style="display:none;">
                <div class="widget-codetool--inner">
                <button type="button" class="btn btn-dark far fa-copy rounded-0 sflex-center copyCode" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};
        Object.defineProperty(obj,'hello',{
          get:function(){
            //我们在这里拦截到了数据
            console.log(&quot;get方法被调用&quot;);
          },
          set:function(newValue){
            //改变数据的值，拦截下来额
            console.log(&quot;set方法被调用&quot;);
            document.getElementById('test').value = newValue;
            document.getElementById('test1').innerHTML = newValue;
          }
        });
        //obj.hello;
        //obj.hello = '123';
        document.getElementById('test').addEventListener('input',function(e){
          obj.hello = e.target.value;//触发它的set方法
        })" title="" data-original-title="复制"></button>
                </div>
                </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {};
        <span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">'hello'</span>,{
          <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-comment">//我们在这里拦截到了数据</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"get方法被调用"</span>);
          },
          <span class="hljs-attr">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>)</span>{
            <span class="hljs-comment">//改变数据的值，拦截下来额</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"set方法被调用"</span>);
            <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'test'</span>).value = newValue;
            <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'test1'</span>).innerHTML = newValue;
          }
        });
        <span class="hljs-comment">//obj.hello;</span>
        <span class="hljs-comment">//obj.hello = '123';</span>
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'test'</span>).addEventListener(<span class="hljs-string">'input'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
          obj.hello = e.target.value;<span class="hljs-comment">//触发它的set方法</span>
        })</code></pre>
        <h2 id="oneeight">理解Vue中的Render渲染函数</h2>
        <p><a href="https://www.cnblogs.com/tugenhua0707/p/7528621.html">https://www.cnblogs.com/tugen...</a></p>
        <p>VUE一般使用template来创建HTML，然后在有的时候，我们需要使用javascript来创建html，这时候我们需要使用render函数。</p>
        <p>render函数return一个createElement组件中的子元素存储在组件实列中 <code>$slots.default</code> 中。</p>
        <p><code>return createElement('h1', this.title)</code>; <code>createElement</code>返回的是包含的信息会告诉VUE页面上需要渲染什么样的节点及其子节点。我们称这样的节点为虚拟DOM，可以简写为VNode。</p>
        <h4>createElement 参数</h4>
        <div class="widget-codetool" style="display:none;">
                <div class="widget-codetool--inner">
                <button type="button" class="btn btn-dark far fa-copy rounded-0 sflex-center copyCode" data-toggle="tooltip" data-placement="top" data-clipboard-text="{String | Object | Function}" title="" data-original-title="复制"></button>
                </div>
                </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">{<span class="hljs-built_in">String</span> | <span class="hljs-built_in">Object</span> | <span class="hljs-built_in">Function</span>}</code></pre>
        <p>一个HTML标签字符串，组件选项对象，或者一个返回值类型为String/Object的函数。该参数是  必须的</p>
        <h4>子节点</h4>
        <p>子节点，可选，String 或 Array</p>
        <div class="widget-codetool" style="display:none;">
                <div class="widget-codetool--inner">
                <button type="button" class="btn btn-dark far fa-copy rounded-0 sflex-center copyCode" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('anchored-heading', {
          render: function (createElement) {
            return createElement(
              'h' + this.level,   // 标签名称
              this.$slots.default // 由子节点构成的数组
            )
          },
          props: {
            level: {
              type: Number,
              required: true
            }
          }
        })" title="" data-original-title="复制"></button>
                </div>
                </div><pre class="javascript hljs"><code class="javascript">Vue.component(<span class="hljs-string">'anchored-heading'</span>, {
          <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">createElement</span>) </span>{
            <span class="hljs-keyword">return</span> createElement(
              <span class="hljs-string">'h'</span> + <span class="hljs-built_in">this</span>.level,   <span class="hljs-comment">// 标签名称</span>
              <span class="hljs-built_in">this</span>.$slots.default <span class="hljs-comment">// 由子节点构成的数组</span>
            )
          },
          <span class="hljs-attr">props</span>: {
            <span class="hljs-attr">level</span>: {
              <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
              <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
            }
          }
        })</code></pre>
        <h2 id="onenight">slot插槽</h2>
        <p><a href="https://www.jianshu.com/p/31674b727954">https://www.jianshu.com/p/316...</a></p>
        <p><a href="https://vue.docschina.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD-scoped-slots">https://vue.docschina.org/v2/...</a></p>
        <h4>单个插槽</h4>
        <p>当子组件模板只有一个没有属性的插槽时，父组件传入的整个内容片段将插入到插槽所在的 DOM 位置，并替换掉插槽标签本身。</p>
        <p>最初在 &lt;slot&gt; 标签中的任何内容都被视为备用内容。备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容。</p>
        <h4>命名插槽</h4>
        <p>solt元素可以用一个特殊的特性name来进一步配置如何分发内容。多个插槽可以有不同的名字。<br>这样可以将父组件模板中 slot 位置，和子组件 slot 元素产生关联，便于插槽内容对应传递</p>
        <h4>作用域插槽scoped slots</h4>
        <p>可以访问组件内部数据的可复用插槽(reusable slot)<br>在父级中，具有特殊特性 <code>slot-scope</code> 的<code>&lt;template&gt;</code> 元素必须存在，表示它是作用域插槽的模板。slot-scope 的值将被用作一个临时变量名，此变量接收从子组件传递过来的 prop 对象。</p>
        </article>
    <li>组件通信</li>
    <li>路由跳转</li>
    <li>vue-router 有哪几种导航钩子</li>
    <li>Vue.js 2.x 双向绑定原理</li>
    <li>什么是 MVVM，与 MVC 有什么区别</li>
    <li>vuex</li>
    <li>this.$nextTick()</li>
    <li>vue的原理</li>
    <li>理解Vue中的Render渲染函数</li>
    <li>slot插槽</li>
    </ol>
    <h3 id="twozero">v-show 与 v-if 区别</h3>
    <ol>
    <li>v-hsow和v-if的区别：<br>v-show是css切换，v-if是完整的销毁和重新创建。</li>
    <li>使用<br>频繁切换时用v-show，运行时较少改变时用v-if</li>
    <li>v-if=‘false’ v-if是条件渲染，当false的时候不会渲染</li>
    </ol>
    <h3 id="twoone">绑定 class 的数组用法</h3>
    <ul>
    <li>对象方法 <code>v-bind:class="{'orange': isRipe, 'green': isNotRipe}"</code>
    </li>
    <li>数组方法<code>v-bind:class="[class1, class2]"</code>
    </li>
    <li>行内 <code>v-bind:style="{color: color, fontSize: fontSize+'px' }"</code>
    </li>
    </ul>
    <h3 id="twotwo">计算属性和 watch 的区别</h3>
    <p>计算属性是自动监听依赖值的变化，从而动态返回内容，监听是一个过程，在监听的值变化时，可以触发一个回调，并做一些事情。<br>所以区别来源于用法，只是需要动态值，那就用计算属性；需要知道值的改变后执行业务逻辑，才用 watch，用反或混用虽然可行，但都是不正确的用法。<br><strong>说出一下区别会加分</strong><br>computed 是一个对象时，它有哪些选项？<br>computed 和 methods 有什么区别？<br>computed 是否能依赖其它组件的数据？<br>watch 是一个对象时，它有哪些选项？</p>
    <ol>
    <li>有get和set两个选项</li>
    <li>methods是一个方法，它可以接受参数，而computed不能，computed是可以缓存的，methods不会。</li>
    <li>computed可以依赖其他computed，甚至是其他组件的data</li>
    <li>watch 配置 <br>handler<br>deep 是否深度<br>immeditate 是否立即执行</li>
    </ol>
    <p><strong>总结</strong></p>
    <p>当有一些数据需要随着另外一些数据变化时，建议使用computed。<br>当有一个通用的响应数据变化的时候，要执行一些业务逻辑或异步操作的时候建议使用watcher</p>
    <h3 id="twothree">事件修饰符</h3>
    <ul>
    <li>绑定一个原生的click事件， 加native，</li>
    <li>其他事件修饰符</li>
    </ul>
    <p>stop prevent  self</p>
    <ul><li>组合键</li></ul>
    <p>click.ctrl.exact 只有ctrl被按下的时候才触发</p>
    <h3 id="twofour">组件中 data 为什么是函数</h3>
    <blockquote>为什么组件中的 data 必须是一个函数，然后 return 一个对象，而 new Vue 实例里，data 可以直接是一个对象？</blockquote>
    <p>因为组件是用来复用的，JS 里对象是引用关系，这样作用域没有隔离，而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。</p>
    <h3 id="twofive">keep-alive</h3>
    <p><a href="https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%9C%A8%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-keep-alive">https://cn.vuejs.org/v2/guide...</a></p>
    <h3 id="twosix">自定义组件的语法糖 v-model 是怎样实现的</h3>
    <p><a href="https://www.cnblogs.com/attacking-cabbage/p/10260393.html">https://www.cnblogs.com/attac...</a><br>  根据官方文档介绍，v-model本质上就是语法糖，即利用v-model绑定数据后，其实就是既绑定了数据，又添加了一个input事件监听，如下：</p>
    <p><span class="img-wrap"><img class="lazy" data-src="/img/bVbqkRp" alt="clipboard.png" title="clipboard.png"></span></p>
    <h3 id="twoseven">怎样理解单向数据流</h3>
    <p>这个概念出现在组件通信。父组件是通过 prop 把数据传递到子组件的，但是这个 prop 只能由父组件修改，子组件不能修改，否则会报错。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。<br>一般来说，对于子组件想要更改父组件状态的场景，可以有两种方案：<br>在子组件的 data 中拷贝一份 prop，data 是可以修改的，但 prop 不能：</p>
    <div class="widget-codetool" style="display:none;">
            <div class="widget-codetool--inner">
            <button type="button" class="btn btn-dark far fa-copy rounded-0 sflex-center copyCode" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
      props: {
        value: String
      },
      data () {
        return {
          currentValue: this.value
        }
      }
    }" title="" data-original-title="复制"></button>
            </div>
            </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
      <span class="hljs-attr">props</span>: {
        <span class="hljs-attr">value</span>: <span class="hljs-built_in">String</span>
      },
      data () {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">currentValue</span>: <span class="hljs-built_in">this</span>.value
        }
      }
    }</code></pre>
    <p>如果是对 prop 值的转换，可以使用计算属性：</p>
    <div class="widget-codetool" style="display:none;">
            <div class="widget-codetool--inner">
            <button type="button" class="btn btn-dark far fa-copy rounded-0 sflex-center copyCode" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
      props: ['size'],
      computed: {
        normalizedSize: function () {
          return this.size.trim().toLowerCase();
        }
      }
    }" title="" data-original-title="复制"></button>
            </div>
            </div><pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
      <span class="hljs-attribute">props</span>: [<span class="hljs-string">'size'</span>],
      computed: {
        normalizedSize: function () {
          return this.size.<span class="hljs-built_in">trim</span>().<span class="hljs-built_in">toLowerCase</span>();
        }
      }
    }</code></pre>
    <h3 id="twoeight">生命周期</h3>
    <ul><li>创建前后 beforeCreate/created</li></ul>
    <p>在beforeCreate 阶段，vue实例的挂载元素el和数据对象data都为undefined，还未初始化。在created阶段，vue实例的数据对象有了，el还没有。</p>
    <ul><li>载入前后 beforeMount/mounted</li></ul>
    <p>在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前未虚拟的DOM节点，data尚未替换。 <br>在mounted阶段，vue实例挂载完成，data成功渲染。</p>
    <ul><li>更新前后 beforeUpdate/updated</li></ul>
    <p>当data变化时，会触发beforeUpdate和updated方法。这两个不常用，不推荐使用。</p>
    <ul><li>销毁前后beforeDestory/destoryed</li></ul>
    <p>beforeDestory是在vue实例销毁前触发，一般在这里要通过removeEventListener解除手动绑定的事件。实例销毁后，触发的destroyed。</p>
    <h3 id="twonight">组件间的通信</h3>
    <ol>
    <li>父子 props/event  <span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>p</mi><mi>a</mi><mi>r</mi><mi>e</mi><mi>n</mi><mi>t</mi><mi mathvariant="normal">/</mi></mrow><annotation encoding="application/x-tex">parent/</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em;"></span><span class="mord mathnormal">p</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right: 0.02778em;">r</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mord mathnormal">t</span><span class="mord">/</span></span></span></span></span>children    ref  provide/inject</li>
    <li>兄弟  bus vuex</li>
    <li>跨级 bus  vuex provide.inject</li>
    </ol>
    <h3 id="threezero">路由的跳转方式</h3>
    <p>一般有两种</p>
    <ol>
    <li>
    <code>&lt;router-link to='home'&gt; router-link</code>标签会渲染为<code>&lt;a&gt;</code>标签，咋填template中的跳转都是这种；</li>
    <li>另一种是编程是导航  也就是通过js跳转  比如  <code>router.push('/home')</code>
    </li>
    </ol>
    <h3 id="threeone">Vue.js 2.x 双向绑定原理</h3>
    <p>这个问题几乎是面试必问的，回答也是有深有浅。基本上要知道核心的 API 是通过 <code>Object.defineProperty()</code> 来劫持各个属性的<code> setter / getter</code>，在数据变动时发布消息给订阅者，触发相应的监听回调，这也是为什么 Vue.js 2.x 不支持 IE8 的原因（IE 8 不支持此 API，且无法通过 polyfill 实现）。<br><a href="https://cn.vuejs.org/v2/guide/reactivity.html">https://cn.vuejs.org/v2/guide...</a></p>
    <h3 id="threetwo">什么是 MVVM，与 MVC 有什么区别</h3>
    <p><a href="http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html">http://www.ruanyifeng.com/blo...</a></p>
    <h3 id="threethree">nextTick()</h3>
    <p>在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后，立即使用这个回调函数，获取更新后的 DOM。</p>
    <div class="widget-codetool" style="display:none;">
            <div class="widget-codetool--inner">
            <button type="button" class="btn btn-dark far fa-copy rounded-0 sflex-center copyCode" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 修改数据
    vm.msg = 'Hello'
    // DOM 还未更新
    Vue.nextTick(function () {
      // DOM 更新
    })" title="" data-original-title="复制"></button>
            </div>
            </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span> 修改数据
    vm.msg = <span class="hljs-string">'Hello'</span>
    <span class="hljs-regexp">//</span> DOM 还未更新
    Vue.nextTick(<span class="hljs-keyword">function</span> () {
      <span class="hljs-regexp">//</span> DOM 更新
    })</code></pre>
    <h2 id="threefour">vue的原理</h2>
    <p><a href="https://segmentfault.com/a/1190000016434836">https://segmentfault.com/a/11...</a></p>
    <p><span class="img-wrap"><img class="lazy" data-src="/img/remote/1460000018707445?w=1200&amp;h=750" alt="" title=""></span><br>Vue的模式是m-v-vm模式，即（<code>model-view-modelView</code>），通过modelView作为中间层（即vm的实例），进行双向数据的绑定与变化。</p>
    <ol>
    <li>通过建立虚拟dom树<code>document.createDocumentFragment()</code>,方法创建虚拟dom树。</li>
    <li>一旦被监测的数据改变，会通过<code>Object.defineProperty</code>定义的数据拦截，截取到数据的变化。</li>
    <li>截取到的数据变化，从而通过订阅——发布者模式，触发<code>Watcher</code>（观察者）,从而改变虚拟dom的中的具体数据。</li>
    <li>最后，通过更新虚拟dom的元素值，从而改变最后渲染dom树的值，完成双向绑定</li>
    </ol>
    <p>双向绑定的实现</p>
    <div class="widget-codetool" style="display:none;">
            <div class="widget-codetool--inner">
            <button type="button" class="btn btn-dark far fa-copy rounded-0 sflex-center copyCode" data-toggle="tooltip" data-placement="top" data-clipboard-text="object.defineProperty 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
    语法：Object.defineProperty(obj, prop, descriptor)
    
    var obj = {};
    Object.defineProperty(obj,'hello',{
      get:function(){
        //我们在这里拦截到了数据
        console.log(&quot;get方法被调用&quot;);
      },
      set:function(newValue){
        //改变数据的值，拦截下来额
        console.log(&quot;set方法被调用&quot;);
      }
    });
    obj.hello//输出为“get方法被调用”，输出了值。
    obj.hello = 'new Hello';//输出为set方法被调用，修改了新值" title="" data-original-title="复制"></button>
            </div>
            </div><pre class="javascript hljs"><code class="javascript">object.defineProperty 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
    语法：<span class="hljs-built_in">Object</span>.defineProperty(obj, prop, descriptor)
    
    <span class="hljs-keyword">var</span> obj = {};
    <span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">'hello'</span>,{
      <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">//我们在这里拦截到了数据</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"get方法被调用"</span>);
      },
      <span class="hljs-attr">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>)</span>{
        <span class="hljs-comment">//改变数据的值，拦截下来额</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"set方法被调用"</span>);
      }
    });
    obj.hello<span class="hljs-comment">//输出为“get方法被调用”，输出了值。</span>
    obj.hello = <span class="hljs-string">'new Hello'</span>;<span class="hljs-comment">//输出为set方法被调用，修改了新值</span></code></pre>
    <p>我们可以做到数据的双向绑定：</p>
    <div class="widget-codetool" style="display:none;">
            <div class="widget-codetool--inner">
            <button type="button" class="btn btn-dark far fa-copy rounded-0 sflex-center copyCode" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};
    Object.defineProperty(obj,'hello',{
      get:function(){
        //我们在这里拦截到了数据
        console.log(&quot;get方法被调用&quot;);
      },
      set:function(newValue){
        //改变数据的值，拦截下来额
        console.log(&quot;set方法被调用&quot;);
        document.getElementById('test').value = newValue;
        document.getElementById('test1').innerHTML = newValue;
      }
    });
    //obj.hello;
    //obj.hello = '123';
    document.getElementById('test').addEventListener('input',function(e){
      obj.hello = e.target.value;//触发它的set方法
    })" title="" data-original-title="复制"></button>
            </div>
            </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {};
    <span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">'hello'</span>,{
      <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">//我们在这里拦截到了数据</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"get方法被调用"</span>);
      },
      <span class="hljs-attr">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>)</span>{
        <span class="hljs-comment">//改变数据的值，拦截下来额</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"set方法被调用"</span>);
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'test'</span>).value = newValue;
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'test1'</span>).innerHTML = newValue;
      }
    });
    <span class="hljs-comment">//obj.hello;</span>
    <span class="hljs-comment">//obj.hello = '123';</span>
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'test'</span>).addEventListener(<span class="hljs-string">'input'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
      obj.hello = e.target.value;<span class="hljs-comment">//触发它的set方法</span>
    })</code></pre>
    <h2 id="threefive">理解Vue中的Render渲染函数</h2>
    <p><a href="https://www.cnblogs.com/tugenhua0707/p/7528621.html">https://www.cnblogs.com/tugen...</a></p>
    <p>VUE一般使用template来创建HTML，然后在有的时候，我们需要使用javascript来创建html，这时候我们需要使用render函数。</p>
    <p>render函数return一个createElement组件中的子元素存储在组件实列中 <code>$slots.default</code> 中。</p>
    <p><code>return createElement('h1', this.title)</code>; <code>createElement</code>返回的是包含的信息会告诉VUE页面上需要渲染什么样的节点及其子节点。我们称这样的节点为虚拟DOM，可以简写为VNode。</p>
    <h4>createElement 参数</h4>
    <div class="widget-codetool" style="display:none;">
            <div class="widget-codetool--inner">
            <button type="button" class="btn btn-dark far fa-copy rounded-0 sflex-center copyCode" data-toggle="tooltip" data-placement="top" data-clipboard-text="{String | Object | Function}" title="" data-original-title="复制"></button>
            </div>
            </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">{<span class="hljs-built_in">String</span> | <span class="hljs-built_in">Object</span> | <span class="hljs-built_in">Function</span>}</code></pre>
    <p>一个HTML标签字符串，组件选项对象，或者一个返回值类型为String/Object的函数。该参数是  必须的</p>
    <h4>子节点</h4>
    <p>子节点，可选，String 或 Array</p>
    <div class="widget-codetool" style="display:none;">
            <div class="widget-codetool--inner">
            <button type="button" class="btn btn-dark far fa-copy rounded-0 sflex-center copyCode" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('anchored-heading', {
      render: function (createElement) {
        return createElement(
          'h' + this.level,   // 标签名称
          this.$slots.default // 由子节点构成的数组
        )
      },
      props: {
        level: {
          type: Number,
          required: true
        }
      }
    })" title="" data-original-title="复制"></button>
            </div>
            </div><pre class="javascript hljs"><code class="javascript">Vue.component(<span class="hljs-string">'anchored-heading'</span>, {
      <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">createElement</span>) </span>{
        <span class="hljs-keyword">return</span> createElement(
          <span class="hljs-string">'h'</span> + <span class="hljs-built_in">this</span>.level,   <span class="hljs-comment">// 标签名称</span>
          <span class="hljs-built_in">this</span>.$slots.default <span class="hljs-comment">// 由子节点构成的数组</span>
        )
      },
      <span class="hljs-attr">props</span>: {
        <span class="hljs-attr">level</span>: {
          <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
          <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
        }
      }
    })</code></pre>
    <h2 id="threesix">slot插槽</h2>
    <p><a href="https://www.jianshu.com/p/31674b727954">https://www.jianshu.com/p/316...</a></p>
    <p><a href="https://vue.docschina.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD-scoped-slots">https://vue.docschina.org/v2/...</a></p>
    <h4>单个插槽</h4>
    <p>当子组件模板只有一个没有属性的插槽时，父组件传入的整个内容片段将插入到插槽所在的 DOM 位置，并替换掉插槽标签本身。</p>
    <p>最初在 &lt;slot&gt; 标签中的任何内容都被视为备用内容。备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容。</p>
    <h4>命名插槽</h4>
    <p>solt元素可以用一个特殊的特性name来进一步配置如何分发内容。多个插槽可以有不同的名字。<br>这样可以将父组件模板中 slot 位置，和子组件 slot 元素产生关联，便于插槽内容对应传递</p>
    <h4>作用域插槽scoped slots</h4>
    <p>可以访问组件内部数据的可复用插槽(reusable slot)<br>在父级中，具有特殊特性 <code>slot-scope</code> 的<code>&lt;template&gt;</code> 元素必须存在，表示它是作用域插槽的模板。slot-scope 的值将被用作一个临时变量名，此变量接收从子组件传递过来的 prop 对象。</p>
    </div>`,
            menulist:[],
            heightList:[],
            imsg:'',
            imsgb:'',
            imsgt:''
          }
      }
  },
  created() {
    let id = this.$route.query.id
    request.request({
    url:'http://39.107.227.252/getStudyInfo/',
    data:{'sid': id, 'code': 0},
    method: 'post',
    }).then(res =>{
      this.studyInfo = res.data
    }).catch(err =>{
      console.log(err);
    })

  }
}

</script>


<style>
.study{
  height: 1875px;

}
</style>