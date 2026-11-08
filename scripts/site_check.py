#!/usr/bin/env python3
"""site_check.py — lightwhispers6/chaiAI 站点线上体检（只读）.

改编自 kenyanghui/rsi-ima-workbuddy-wechat-web 技能的 site_check.py，
CHECKS 从 chai 讲师站资产替换为本站（https://lightwhispers6.github.io/chaiAI/）真实路径。
设计原则：仅标准库、零第三方依赖、绝不写线上任何内容（体检只读红线）。

用法:
    python3 scripts/site_check.py              # 人类可读表格
    python3 scripts/site_check.py --json       # 机器格式（供 CI / Actions 消费）
    python3 scripts/site_check.py --retry      # 失败项隔 10s 复测一次再定性

退出码: 全部通过 exit 0，任一失败 exit 1；网络异常按 fail 记录，不崩溃。

纪律：瞬时抖动 ≠ 站点故障，单检查项失败先复测一次；复测恢复记 pass 并注明，
复测仍挂才算持续故障。

检查项全部为 2026-11-08 实测 200 的真实路径：
- SPA 深层路由（/hot/books 等）原始 HTTP 返回 404，由 404.html 前端跳转接管，
  属正常机制，不作为检查项；改测 404.html 本身（SPA 回退机制完好性）。
"""

import json
import sys
import time
import urllib.request

TIMEOUT = 15
RETRY_DELAY = 10  # 复测间隔（秒）

BASE = "https://lightwhispers6.github.io/chaiAI"

CHECKS = [
    {"id": "chaiAI-home", "url": f"{BASE}/", "expect": "status+title",
     "desc": "主站首页 200 且含 <title>"},
    {"id": "chaiAI-spa-fallback", "url": f"{BASE}/404.html", "expect": "status+title",
     "desc": "SPA 回退页 404.html 200 且含 <title>"},
    {"id": "chaiAI-chailive", "url": f"{BASE}/chailive/", "expect": "status+title",
     "desc": "chailive 子站 200 且含 <title>"},
    {"id": "chaiAI-tf-assess", "url": f"{BASE}/tf-assess/", "expect": "status+title",
     "desc": "过级自评表 200 且含 <title>"},
    {"id": "chaiAI-chaibuddy-data", "url": f"{BASE}/chaibuddy/people.json", "expect": "status",
     "desc": "拆搭子名录 people.json 200"},
    {"id": "chaiAI-hot-index", "url": f"{BASE}/hot/index.json", "expect": "status",
     "desc": "热门书单数据 index.json 200"},
    {"id": "chaiAI-workbook", "url": f"{BASE}/workbook/index.html", "expect": "status+title",
     "desc": "workbook 子站 200 且含 <title>"},
]


def run_check(c, retry=False):
    res = _probe(c)
    if retry and not res["ok"]:
        first_err = res["detail"]
        time.sleep(RETRY_DELAY)
        res2 = _probe(c)
        if res2["ok"]:
            res = res2
            res["detail"] = f"{res['detail']}（复测通过；首轮: {first_err}）"
    return res


def _probe(c):
    start = time.time()
    res = {"id": c["id"], "ok": False, "ms": 0, "detail": ""}
    try:
        req = urllib.request.Request(c["url"], headers={"User-Agent": "site-check/1.0 (+chaiAI fork)"})
        with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
            body = r.read(65536).decode("utf-8", "replace")
            status = r.status
        ms = int((time.time() - start) * 1000)
        res["ms"] = ms
        if status != 200:
            res["detail"] = f"HTTP {status}"
            return res
        if c["expect"] == "status+title" and "<title" not in body.lower():
            res["detail"] = "200 但未见 <title>"
            return res
        res["ok"] = True
        res["detail"] = c["desc"] + f"（{len(body)}B）"
    except Exception as e:
        res["ms"] = int((time.time() - start) * 1000)
        res["detail"] = f"异常: {type(e).__name__}: {e}"[:180]
    return res


def main():
    as_json = "--json" in sys.argv
    do_retry = "--retry" in sys.argv
    results = [run_check(c, retry=do_retry) for c in CHECKS]
    overall = "pass" if all(r["ok"] for r in results) else "fail"
    if as_json:
        print(json.dumps({"ts": int(time.time() * 1000), "overall": overall, "checks": results}, ensure_ascii=False, indent=2))
    else:
        print(f"chaiAI 站点体检  {time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())}")
        print("-" * 64)
        for r in results:
            mark = "✓" if r["ok"] else "✗"
            print(f" {mark} {r['id']:<22} {r['ms']:>5}ms  {r['detail']}")
        print("-" * 64)
        n_ok = sum(1 for r in results if r["ok"])
        print(f" 结果: {overall.upper()} （{n_ok}/{len(results)} 项通过）")
    sys.exit(0 if overall == "pass" else 1)


if __name__ == "__main__":
    main()
