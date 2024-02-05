# 概要

東京通信大学の課題提出状況を管理するアプリ

# 読み込み方

1. このソースコードを丸ごとダウンロード(zipファイルでダウンロードする場合は解凍する)    
2. Google Chromeの右上のアイコンから「拡張機能を管理」をクリック  
3. デベロッパーモードをオンにする  
4. 「パッケージ化されていない拡張機能を読み込む」をクリック  
5. 最初にダウンロードしたフォルダを指定
 
# 使用方法

* @ROOMの「受講進捗確認」を開いてメッセージが表示されるとデータが初期化される。
* テストの結果画面を開き、「得点状況を更新しました」とメッセージが表示されるとテストの得点状況が更新され、  ポップアップをクリックすると一括で確認できるようになる。

# 注意事項
* 得点を表示するページをバックグラウンドでクローリングする機能は大学サーバーへの負担を考慮して実装していない(予定もない)。
そのため、他の端末やブラウザから提出した小テストの点数は更新されないが、代わりに今後ユーザーが手動で点数を更新できるように機能を追加する。

# デモ

![スクリーンショット_2024-01-09_12-50-27](https://github.com/manabeai/tou_manager/assets/100462113/318027e6-4919-4b1c-8c18-f3be8c9e8964)
